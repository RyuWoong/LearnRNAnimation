import { FlatList, ScrollView, StyleSheet, Text, useWindowDimensions, View, ViewToken } from 'react-native';
import { Fragment, useRef, useState } from 'react';

const list = [new Array(10).fill(0).map((_, index) => index), new Array(10).fill(0).map((_, index) => index)];
function FocusScroll() {
  const { width } = useWindowDimensions();
  const itemWidth = (width - 40 - 10) / 2;
  const itemHeight = 200;
  const startRef = useRef<string>('');

  const [topItem, setTopItem] = useState<string>('');
  const flatListViewRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    console.log('onMomentumScrollEnd', startRef.current);
    if (startRef.current) {
      setTopItem(startRef.current);
    }
  };

  const onViewableItemsChanged = (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
    if (info.viewableItems.length > 0) {
      console.log(info.viewableItems[0]);
      startRef.current = info.viewableItems[0].key;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topItemText}>현재 최상단 아이템: {topItem}</Text>
      <FlatList
        ref={flatListViewRef}
        data={list}
        keyExtractor={(item, index) => index.toString()}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item, index: parentIndex }) => (
          <FlatList
            data={item}
            keyExtractor={(_, index) => `sub${parentIndex}-${index.toString()}`}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => (
              <View key={item} style={[styles.item, { width: itemWidth, height: itemHeight }]}>
                <Text>{item}</Text>
              </View>
            )}
          />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  row: {},
  item: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topItemText: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
});

export default FocusScroll;
