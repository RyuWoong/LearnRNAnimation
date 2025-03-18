import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const StreamTextWithAnimation = ({ text, speed = 30, loading }: { text: string; speed: number; loading: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 문자별 애니메이션 값을 저장할 배열
  const [animatedValues, setAnimatedValues] = useState<Animated.Value[]>([]);

  // 텍스트가 변경되면 초기화
  useEffect(() => {
    if (loading) {
      setDisplayedText('');
      setCurrentIndex(0);
      setAnimatedValues([]);
    }
  }, [loading]);

  // 새 문자가 추가될 때마다 해당 문자의 애니메이션 값 추가
  useEffect(() => {
    if (currentIndex > 0 && currentIndex <= text.length) {
      const newAnimValue = new Animated.Value(0);
      setAnimatedValues(prev => [...prev, newAnimValue]);

      // FadeInDown 애니메이션 실행
      Animated.timing(newAnimValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [currentIndex]);

  // 텍스트 스트리밍 로직
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (currentIndex < text.length) {
      intervalRef.current = setInterval(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, text, speed]);

  return (
    <View>
      <View style={styles.textContainer}>
        {displayedText.split('').map((char, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.text,
              {
                opacity: animatedValues[index] || 0,
                transform: [
                  {
                    translateY: (animatedValues[index] || new Animated.Value(0)).interpolate({
                      inputRange: [0, 1],
                      outputRange: [10, 0], // 20px 아래에서 시작하여 원래 위치로 이동
                    }),
                  },
                ],
              },
            ]}
          >
            {char}
          </Animated.Text>
        ))}
        {currentIndex < text.length && <Text style={styles.cursor}>|</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  cursor: {
    fontSize: 16,
    opacity: 1,
  },
});

export default StreamTextWithAnimation;
