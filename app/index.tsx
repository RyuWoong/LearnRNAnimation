import ListItem from '@/components/main/ListItem';
import { StyleSheet, FlatList, Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const list = [
  { id: 1, name: 'Bouncy Onboarding' },
  { id: 2, name: 'Circular Onboarding' },
  { id: 3, name: 'LLM Animation' },
  { id: 4, name: 'React Logo Animation' },
  { id: 5, name: 'Clip Image' },
  { id: 6, name: 'Hue' },
  { id: 7, name: 'Skia Logo Animation' },
  { id: 8, name: 'Chasing Bubbles' },
  { id: 9, name: 'Arc Slider' },
  { id: 10, name: 'Loader' },
  { id: 11, name: 'Blur Card' },
  { id: 12, name: 'Tracing Path' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <Text>50-Days-React-Native</Text>
      </View>
      <FlatList
        data={list}
        keyExtractor={({ id }) => `list-${id}`}
        renderItem={ListItem}
        contentContainerStyle={styles.ContentContainStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: { flex: 1, backgroundColor: 'white' },
  Header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  ContentContainStyle: { gap: 2 },
});
