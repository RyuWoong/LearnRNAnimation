import { BlurMask, Canvas, Circle, Path, Skia, SweepGradient, vec } from '@shopify/react-native-skia';
import { useEffect, useMemo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const CanvasSize = 100;
const CircleSize = 64;
const StrokeWidth = 10;
const CircleRadius = (CircleSize - StrokeWidth) / 2;

function Loader() {
  const rotate = useSharedValue(0);
  const start = useSharedValue(0);
  const circlePath = useMemo(() => {
    const skPath = Skia.Path.Make();
    skPath.addCircle(CanvasSize / 2, CanvasSize / 2, CircleRadius);
    return skPath;
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value * 2 * Math.PI}rad` }],
    };
  });

  const startAnimated = useDerivedValue(() => {
    return interpolate(start.value, [0, 0.5, 1], [0.3, 0.5, 0.7]);
  }, []);

  useEffect(() => {
    rotate.value = withRepeat(withTiming(1, { duration: 1000, easing: Easing.linear }), -1, false);
    start.value = withRepeat(withTiming(1, { duration: 1000, easing: Easing.linear }), -1, true);
  }, [rotate, start]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={rStyle} entering={FadeIn.duration(1000)} exiting={FadeOut.duration(1000)}>
        <Canvas style={{ width: CanvasSize, height: CanvasSize }}>
          {/* <Circle
          cx={CanvasSize / 2}
          cy={CanvasSize / 2}
          r={CanvasSize / 2}
          color="white"
          style="stroke"
          strokeWidth={StrokeWidth}
        /> */}
          <Path
            path={circlePath}
            color="white"
            style="stroke"
            strokeWidth={StrokeWidth}
            start={startAnimated}
            end={1}
            strokeCap={'round'}
          >
            <SweepGradient c={vec(CanvasSize / 2, CanvasSize / 2)} colors={['cyan', 'magenta', 'yellow', 'cyan']} />
            <BlurMask blur={7} style="solid" />
          </Path>
        </Canvas>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default Loader;
