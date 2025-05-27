import { Canvas, Circle } from '@shopify/react-native-skia';
import { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SharedValue, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');
const dotsForWidth = 12;

const Dot = ({
  index,
  xPosition,
  yPosition,
}: {
  index: number;
  xPosition: SharedValue<number>;
  yPosition: SharedValue<number>;
}) => {
  const currentColumn = (index % dotsForWidth) * 30 + 35;
  const currentRow = Math.floor(index / dotsForWidth) * 30;
  const radius = useDerivedValue(() => {
    const hypotenuse = Math.hypot(xPosition.value - currentColumn, yPosition.value - 30 - currentRow);

    if (hypotenuse < 55 && xPosition.value !== -1) {
      return withSpring(11, { overshootClamping: true });
    } else {
      return withSpring(3, { overshootClamping: true });
    }
  }, [xPosition, yPosition]);

  return <Circle cx={currentColumn} cy={currentRow + 30} r={radius} color={index === 1 ? 'red' : 'blue'} />;
};

function ChasingBubbles() {
  const [nums, setNums] = useState<number[]>([]);

  const xPosition = useSharedValue(-1);
  const yPosition = useSharedValue(-1);

  useEffect(() => {
    // const dotsForWidth = Math.round(width / 20);
    const dotsForHeight = Math.round(height / 20);
    const numsArray = Array.from(Array(dotsForWidth * dotsForHeight).keys());
    setNums(numsArray);
  }, []);

  const gesture = Gesture.Pan()
    .onEnd(() => {
      xPosition.value = -1;
      yPosition.value = -1;
    })
    .onFinalize(() => {
      xPosition.value = -1;
      yPosition.value = -1;
    })
    .onBegin(({ x, y }) => {
      xPosition.value = x;
      yPosition.value = y;
    })
    .onChange(({ x, y }) => {
      xPosition.value = x;
      yPosition.value = y;
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureDetector gesture={gesture}>
          <Canvas style={{ flex: 1 }}>
            {nums.map(num => (
              <Dot key={num} index={num} xPosition={xPosition} yPosition={yPosition} />
            ))}
          </Canvas>
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default ChasingBubbles;
