import {
  Blur,
  BlurMask,
  Canvas,
  canvas2Polar,
  Circle,
  ColorMatrix,
  Fill,
  Group,
  polar2Canvas,
  Shader,
  Skia,
  vec,
} from '@shopify/react-native-skia';
import { useCallback, useState } from 'react';
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue, withDecay } from 'react-native-reanimated';

const source = Skia.RuntimeEffect.Make(`
uniform vec2 center;
uniform float radius;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float smoothMask(float dist, float r, float smooth_width) {
    return 1.0 - smoothstep(r - smooth_width, r, dist);
}

vec4 main(vec2 pos) {
    float dist = distance(pos, center);
    float mask = smoothMask(dist, radius, 2.0);
    
    vec2 delta = pos - center;
    float angle = atan(delta.y, delta.x);
    
    float hue = mod((-angle + 3.14159 * 0.5) / (2.0 * 3.14159), 1.0);
    float saturation = clamp(dist / radius, 0.0, 1.0);
    
    vec3 rgb = hsv2rgb(vec3(hue, saturation, 1.0));
    return vec4(rgb * mask, mask);
}`)!;

const hsv2rgb = (h: number, s: number, v: number) => {
  'worklet';
  h = ((h % 1) + 1) % 1; // 색상값을 0~1 범위로 정규화

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r = 0,
    g = 0,
    b = 0;
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

function Hue() {
  const { width } = Dimensions.get('window');
  const [height, setHeight] = useState(0);
  const center = { x: width / 2, y: height / 2 };
  const r = (width - 32) / 2;

  const translateX = useSharedValue(center.x);
  const translateY = useSharedValue(center.y);
  const color = useSharedValue('#ffffff');

  const gesture = Gesture.Pan().onChange(e => {
    const polar = canvas2Polar(vec(e.x, e.y), vec(center.x, center.y));
    const normalizedRadius = Math.min(polar.radius, r);
    const { x, y } = polar2Canvas({ theta: polar.theta, radius: normalizedRadius }, vec(center.x, center.y));

    translateX.value = x;
    translateY.value = y;

    const hue = ((polar.theta + Math.PI * 2.5) / (2 * Math.PI)) % 1;
    const saturation = Math.min(polar.radius / r, 1);

    color.value = hsv2rgb(hue, saturation, 1);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <GestureDetector gesture={gesture}>
            <Canvas style={{ flex: 1 }} onLayout={e => setHeight(e.nativeEvent.layout.height)}>
              <Fill color={color} />
              <Group>
                <Circle c={center} r={r}>
                  <Shader
                    source={source}
                    uniforms={{
                      center: vec(center.x, center.y),
                      radius: r,
                    }}
                  />
                </Circle>
                <Circle cx={translateX} cy={translateY} r={10} color="black" />
                <BlurMask blur={1} />
              </Group>
            </Canvas>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default Hue;
