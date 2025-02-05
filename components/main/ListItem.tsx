import { Pressable, StyleSheet, Text } from 'react-native';

interface Props {
	item: { id: number; name: string };
}

export default function ListItem({ item }: Props) {
	console.log(item);

	const goTargetScreen = () => {};

	return (
		<Pressable style={styles.Container} onPress={goTargetScreen}>
			<Text>{item.name}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	Container: { paddingVertical: 14, paddingHorizontal: 20 },
});
