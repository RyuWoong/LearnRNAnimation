import {
  BackdropBlur,
  Blur,
  BlurMask,
  Canvas,
  Group,
  Path,
  RadialGradient,
  rect,
  Rect,
  RoundedRect,
  rrect,
  Skia,
} from '@shopify/react-native-skia';
import { useEffect, useMemo } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const cardWidth = 300;
const cardHeight = 200;

export default function BlurCard() {
  const progress = useSharedValue(0);

  return (
    <SafeAreaView
      style={styles.container}
      onTouchStart={() => (progress.value = withSpring(1, { duration: 3000 }))}
      onTouchEnd={() => (progress.value = withTiming(0, { duration: 1000 }))}
    >
      <Canvas style={styles.canvas}>
        <Rect x={0} y={0} width={width} height={height}>
          <RadialGradient c={{ x: width / 2, y: height / 2 }} r={width / 2} colors={['violet', 'black']} />
          {/* <Blur blur={10} /> */}
        </Rect>

        <Group
          transform={[{ translateX: width / 2 - cardWidth / 2 }, { translateY: height / 2 - cardHeight / 2 + 25 }]}
        >
          {new Array(5).fill(0).map((_, index) => {
            const rTransform = useDerivedValue(() => {
              return [
                { rotate: (-Math.PI / 2) * progress.value },
                { translateX: 25 * index * progress.value },
                { perspective: 10000 }, // 원근감
                { rotateY: (Math.PI / 3) * progress.value },
                { rotateZ: (Math.PI / 4) * progress.value },
              ];
            });
            return (
              <Group key={index} origin={{ x: cardWidth / 2, y: cardHeight / 2 }} transform={rTransform}>
                <BlurCardItem progress={progress} />
              </Group>
            );
          })}
        </Group>
      </Canvas>
    </SafeAreaView>
  );
}

const BlurCardItem = ({ progress }: { progress: SharedValue<number> }) => {
  const rProgress = useDerivedValue(() => {
    return progress.value * 5; // 0-1 -> 0-5
  });

  const clipPath = useMemo(() => {
    const skPath = Skia.Path.Make();
    skPath.addRRect(rrect(rect(0, 0, cardWidth, cardHeight), 20, 20));
    return skPath;
  }, []);
  return (
    <Group>
      <Path path={clipPath} color={'#FFFFFF22'} />
      <Path path={clipPath} color={'#FFFFFF77'} style={'stroke'} />
      {/* <RoundedRect x={0} y={0} width={cardWidth} height={cardHeight} r={20} color={'#ffffff22'}> */}
      <BackdropBlur blur={rProgress} clip={clipPath} />
      {/* <Blur blur={10} /> */}
      {/* <BlurMask blur={10} style={'solid'} /> */}
      {/* </RoundedRect> */}
    </Group>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
});
