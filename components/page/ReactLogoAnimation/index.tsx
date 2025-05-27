import {
  BlurMask,
  Canvas,
  Circle,
  DashPathEffect,
  DiscretePathEffect,
  Group,
  mix,
  Oval,
  Paint,
  Path,
  RadialGradient,
  rotate,
  scale,
  Skia,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const center = { x: width / 2, y: (height - 100) / 2 };
const rct = { x: 0 + 40, y: center.y - 50, width: width - 80, height: 100 };

const c1 = '#00e5fe';
const c2 = '#60efff';
const c3 = '#0061ff';

const oval = Skia.Path.Make();
oval.addOval(rct);

export default function ReactLogoAnimation() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 3000 });
  }, []);

  const transform1 = useDerivedValue(() => {
    return [{ rotate: interpolate(progress.value, [0, 1], [0, -Math.PI / 3]) }, { scale: -1 }];
  });

  const transform2 = useDerivedValue(() => {
    return [{ rotate: interpolate(progress.value, [0, 1], [0, Math.PI / 3]) }, { scale: -1 }];
  });

  const end = useDerivedValue(() => {
    return progress.value;
  });

  return (
    <Canvas style={{ flex: 1 }}>
      <Circle c={center} r={25}>
        <RadialGradient c={vec(center.x + 25, center.y)} r={50} colors={[c1, c3]} />
      </Circle>
      <Group color="lightblue" style="stroke" strokeWidth={18} strokeCap="round">
        {/* 원형 그라데이션 */}
        <SweepGradient c={center} colors={[c1, c2, c3]} />
        {/* 블러 효과 추가 */}
        <BlurMask style="inner" blur={12} />
        {/* 부드러운(자글자글) 경로 효과 추가 */}
        {/* <DiscretePathEffect deviation={5} length={10} /> */}
        {/* 점선 효과 추가 */}
        {/* <DashPathEffect intervals={[10, 10]} /> */}
        {/* <Oval rect={rct} /> */}
        <Path path={oval} end={end} />
        <Group transform={transform1} origin={center}>
          {/* <Oval rect={rct} /> */}
          <Path path={oval} end={end} />
        </Group>
        <Group transform={transform2} origin={center}>
          {/* <Oval rect={rct} /> */}
          <Path path={oval} end={end} />
        </Group>
      </Group>
    </Canvas>
  );
}
