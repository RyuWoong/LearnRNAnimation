import ListItem from '@/components/main/ListItem';
import { StyleSheet, FlatList, Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const list = [
  { id: 1, name: 'Bouncy Onboarding' },
  { id: 2, name: 'Circular Onboarding' },
  { id: 3, name: 'LLM Animation' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <Text>50-Days-React-Native</Text>
      </View>
      <FlatList
        style={{ flex: 1, backgroundColor: 'yellow' }}
        data={list}
        keyExtractor={({ id }) => `list-${id}`}
        renderItem={ListItem}
        contentContainerStyle={styles.ContentContainStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: { flex: 1 },
  Header: {
    padding: 20,
  },
  ContentContainStyle: { gap: 2 },
});
