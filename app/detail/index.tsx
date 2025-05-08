import { SkiaLogoAnimation, LLMAnimation, ReactLogoAnimation, ClipImage } from '@/components/page';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function DetailScreen() {
  const { id, name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: name as string,
        }}
      />
      {id === '3' && <LLMAnimation />}
      {id === '4' && <ReactLogoAnimation />}
      {id === '5' && <ClipImage />}
      {id === '6' && <SkiaLogoAnimation />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
