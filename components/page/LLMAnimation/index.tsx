import StreamTextWithAnimation from '@/components/ui/StreamTextWithAnimation';
import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function LLMAnimation() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchStreamingResponse = async () => {
    setIsLoading(true);
    setResponse('');

    try {
      // 예시 - 실제 구현에서는 LLM API 호출
      // 시연을 위해 타이머로 대체
      let demoText = '안녕하세요! 저는 AI 어시스턴트입니다. 이 텍스트는 FadeInDown 애니메이션과 함께 스트리밍됩니다.';
      let currentText = '';

      for (let i = 0; i < demoText.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        currentText += demoText[i];
        setResponse(currentText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StreamTextWithAnimation text={response} speed={20} loading={isLoading} />
      <Button
        title={isLoading ? '로딩 중...' : '응답 요청하기'}
        onPress={fetchStreamingResponse}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
