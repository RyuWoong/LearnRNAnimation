import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Fill,
  Group,
  Image,
  ImageShader,
  Paint,
  Path,
  Shader,
  Skia,
  useImage,
} from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';

const source = Skia.RuntimeEffect.Make(`
uniform shader image;

vec4 main(vec2 uv) {
  return image.eval(uv).rbga;
}`)!;

export default function ClipImage() {
  const { width, height } = useWindowDimensions();
  const image = useImage(require('@/assets/images/splash-icon.png'));

  return (
    <Canvas style={{ flex: 1 }}>
      {/* <Path
        path="M 200 200 L 261.8 331.7 L 400 352.9 L 300 455.3 L 331.7 593.2 L 200 655 L 68.3 593.2 L 100 455.3 L 0 352.9 L 138.2 331.7 L 200 200 Z"
        color="lightblue"
        style="stroke"
        strokeWidth={10}
        strokeJoin="round"
      /> */}
      {/* 
      <Group
        clip={
          'M 200 200 L 261.8 331.7 L 400 352.9 L 300 455.3 L 331.7 593.2 L 200 655 L 68.3 593.2 L 100 455.3 L 0 352.9 L 138.2 331.7 L 200 200 Z'
        }
      >
        <Image image={image} fit="cover" x={0} y={0} width={width} height={height} />
      </Group> */}
      {/* <Image image={image} fit="cover" x={0} y={0} width={width} height={height}> */}
      {/* <ColorMatrix
          matrix={[-0.578, 0.99, 0.588, 0, 0, 0.469, 0.535, -0.003, 0, 0, 0.015, 1.69, -0.703, 0, 0, 0, 0, 0, 1, 0]}
        /> */}
      {/* <Blur blur={10} /> */}
      {/* </Image> */}
      {/* <Fill style="stroke" strokeWidth={10} strokeJoin="round">
        <ImageShader image={image} fit="cover" rect={{ x: 0, y: 0, width: width, height: height }} />
      </Fill> */}
      <Fill>
        <Shader source={source}>
          <ImageShader image={image} fit="cover" rect={{ x: 0, y: 0, width: width, height: height }} />
        </Shader>
      </Fill>
    </Canvas>
  );
}
