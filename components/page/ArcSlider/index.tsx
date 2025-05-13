import { Canvas, Circle, Path, polar2Canvas, Rect, Skia } from '@shopify/react-native-skia';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ghost from '@/assets/images/ghost.png';

const { width, height } = Dimensions.get('window');

const strokeWidth = 20;

function ArcSlider() {
  const center = width / 2;
  const r = (width - strokeWidth) / 2 - 40;
  const startAngle = Math.PI;
  const endAngle = Math.PI * 2;

  const x1 = center - r * Math.cos(startAngle);
  const y1 = -r * Math.sin(startAngle) + center;
  const x2 = center - r * Math.cos(endAngle);
  const y2 = -r * Math.sin(endAngle) + center;

  const backgroundPath = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
  const foregroundPath = `M ${x2} ${y2} A ${r} ${r} 1 0 1 ${x1} ${y1}`;
  const skiaBackgroundPath = Skia.Path.MakeFromSVGString(backgroundPath);
  const skiaForegroundPath = Skia.Path.MakeFromSVGString(foregroundPath);

  const movableCx = useSharedValue(x2);
  const movableCy = useSharedValue(y2);

  const previousCx = useSharedValue(x2);
  const previousCy = useSharedValue(y2);

  const percentComplete = useSharedValue(0);
  const skiaPercentComplete = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate(({ absoluteX, translationX, translationY }) => {
      const oldCanvasX = translationX + previousCx.value;
      const oldCanvasY = translationY + previousCy.value;

      const xPrime = oldCanvasX - center;
      const yPrime = -(oldCanvasY - center);

      const rawTheta = Math.atan2(yPrime, xPrime);

      let newTheta = 0;

      if (absoluteX < width / 2 && rawTheta < 0) {
        newTheta = Math.PI;
      } else if (absoluteX > width / 2 && rawTheta <= 0) {
        newTheta = 0;
      } else {
        newTheta = rawTheta;
      }
      const newCoords = polar2Canvas({ theta: newTheta, radius: r }, { x: center, y: center });

      percentComplete.value = 1 - newTheta / Math.PI;
      movableCx.value = newCoords.x;
      movableCy.value = newCoords.y;

      skiaPercentComplete.value = percentComplete.value;
    })
    .onEnd(() => {
      previousCx.value = movableCx.value;
      previousCy.value = movableCy.value;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: 300,
      height: 200,
      opacity: percentComplete.value,
    };
  });

  if (!skiaBackgroundPath || !skiaForegroundPath) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <View style={styles.ghost}>
            <Animated.Image source={ghost} style={animatedStyle} resizeMode="center" />
          </View>
          <Canvas style={styles.canvas}>
            <Rect x={0} y={0} width={width} height={height} color="black" />
            <Path path={skiaBackgroundPath} strokeWidth={strokeWidth} strokeCap="round" color="grey" style="stroke" />
            <Path
              path={skiaForegroundPath}
              strokeWidth={strokeWidth}
              strokeCap="round"
              color="orange"
              style="stroke"
              start={0}
              end={skiaPercentComplete}
            />
            <Circle cx={movableCx} cy={movableCy} r={20} color="orange" />
            <Circle cx={movableCx} cy={movableCy} r={15} color="white" />
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ghost: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  canvas: {
    flex: 1,
  },
});

export default ArcSlider;
