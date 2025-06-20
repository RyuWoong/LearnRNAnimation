import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  item: { id: number; name: string };
}

export default function ListItem({ item }: Props) {
  const goTargetScreen = () => {
    router.navigate({ pathname: '/detail', params: { id: item.id, name: item.name } });
  };

  return (
    <Pressable style={styles.Container} onPress={goTargetScreen}>
      <Text>{item.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Container: { paddingVertical: 14, paddingHorizontal: 20 },
});
