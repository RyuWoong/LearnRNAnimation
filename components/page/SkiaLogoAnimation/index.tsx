import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  Oval,
  Paint,
  RadialGradient,
  rotate,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import { useNavigation } from 'expo-router';
import { Dimensions, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const center = { x: width / 2, y: (height - 100) / 2 };
const rct = { x: 0 + 40, y: center.y - 50, width: width - 80, height: 100 };

const c1 = '#00e5fe';
const c2 = '#60efff';
const c3 = '#0061ff';

export default function SkiaLogoAnimation() {
  return (
    <Canvas style={{ flex: 1 }}>
      <Circle c={center} r={25}>
        <RadialGradient c={vec(center.x + 25, center.y)} r={50} colors={[c1, c3]} />
      </Circle>
      <Group color="lightblue" style="stroke" strokeWidth={18}>
        <BlurMask style="inner" blur={12} />
        <SweepGradient c={center} colors={[c1, c2, c3]} />
        <Oval rect={rct} />
        <Group transform={[{ rotate: Math.PI / 3 }]} origin={center}>
          <Oval rect={rct} />
        </Group>
        <Group transform={[{ rotate: -Math.PI / 3 }]} origin={center}>
          <Oval rect={rct} />
        </Group>
      </Group>
    </Canvas>
  );
}
