import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  Image,
  Oval,
  Paint,
  Path,
  RadialGradient,
  rotate,
  SweepGradient,
  useImage,
  vec,
} from '@shopify/react-native-skia';
import { Dimensions, useWindowDimensions, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const center = { x: width / 2, y: (height - 100) / 2 };
const rct = { x: 0 + 40, y: center.y - 50, width: width - 80, height: 100 };

const c1 = '#00e5fe';
const c2 = '#60efff';
const c3 = '#0061ff';

export default function SkiaLogoAnimation() {
  const { width, height } = useWindowDimensions();
  const image = useImage(require('@/assets/images/splash-icon.png'));

  return (
    <Canvas style={{ flex: 1 }}>
      <Path
        path="M 200 200 L 261.8 331.7 L 400 352.9 L 300 455.3 L 331.7 593.2 L 200 655 L 68.3 593.2 L 100 455.3 L 0 352.9 L 138.2 331.7 L 200 200 Z"
        color="lightblue"
        style="stroke"
        strokeWidth={10}
        strokeJoin="round"
      />
      <Group
        invertClip
        clip={
          'M 200 200 L 261.8 331.7 L 400 352.9 L 300 455.3 L 331.7 593.2 L 200 655 L 68.3 593.2 L 100 455.3 L 0 352.9 L 138.2 331.7 L 200 200 Z'
        }
      >
        <Image image={image} fit="cover" x={0} y={0} width={width} height={height} />
      </Group>
    </Canvas>
  );
}
