import { Canvas, Circle, Group, Rect } from '@shopify/react-native-skia';
import { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS, useDerivedValue, useSharedValue } from 'react-native-reanimated';

function MultiSlider() {
  const [value, setValue] = useState(0);
  const [layout, setLayout] = useState<{ width: number; height: number }>();

  const onChangeValue = useCallback((value: number) => {
    setValue(value);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <View
        style={styles.container}
        onLayout={e => {
          console.log(e.nativeEvent.layout);
          setLayout(e.nativeEvent.layout);
        }}
      >
        {layout && <Slider width={layout.width} height={layout.height} onChangeValue={onChangeValue} />}
      </View>
      <Text style={{ color: 'white' }}>{value}</Text>
    </View>
  );
}

const Slider = ({
  width,
  height = 8,
  onChangeValue,
}: {
  width: number;
  height: number;
  onChangeValue: (value: number) => void;
}) => {
  const r = height / 2;
  const padding = height / 2;

  const cx = useSharedValue(r);
  const x = useDerivedValue(() => {
    return cx.value - r;
  }, [cx]);

  const gesture = Gesture.Pan().onChange(event => {
    if (event.x < r) {
      cx.value = r;
    } else if (event.x > width - r) {
      cx.value = width - r;
    } else {
      cx.value = event.x;
    }
    runOnJS(onChangeValue)(Math.floor(x.value));
  });

  return (
    <GestureHandlerRootView style={styles.canvas}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          <Group transform={[{ translateY: r - 2 }, { translateX: r }]}>
            <Rect
              x={0}
              y={0}
              width={width - r * 2}
              height={r - 2}
              strokeWidth={r - 2}
              color="gray"
              strokeJoin={'round'}
              strokeCap={'round'}
              style="stroke"
            />
            <Rect
              x={0}
              y={0}
              width={x}
              height={r - 2}
              color="red"
              strokeWidth={r - 2}
              strokeCap={'round'}
              strokeJoin={'round'}
              style="stroke"
            />
          </Group>
          <Circle cx={cx} cy={r} r={r} color="white" />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', height: 10 },
  canvas: { flex: 1 },
});

export default MultiSlider;
