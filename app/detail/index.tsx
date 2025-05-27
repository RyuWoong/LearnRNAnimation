import {
  SkiaLogoAnimation,
  LLMAnimation,
  ReactLogoAnimation,
  ClipImage,
  Hue,
  ChasingBubbles,
  ArcSlider,
  Loader,
  BlurCard,
  TracingPath,
} from '@/components/page';
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
      {id === '6' && <Hue />}
      {id === '7' && <SkiaLogoAnimation />}
      {id === '8' && <ChasingBubbles />}
      {id === '9' && <ArcSlider />}
      {id === '10' && <Loader />}
      {id === '11' && <BlurCard />}
      {id === '12' && <TracingPath />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
