// ImageLoader.tsx
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

// HomeCarousel 과 동일하게 계산
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CAROUSEL_WIDTH = SCREEN_WIDTH * 0.85;
const CAROUSEL_HEIGHT = SCREEN_HEIGHT * 0.45;

const ImageLoader = () => (
  <ContentLoader
    speed={1}
    width={CAROUSEL_WIDTH}
    height={CAROUSEL_HEIGHT}
    viewBox={`0 0 ${CAROUSEL_WIDTH} ${CAROUSEL_HEIGHT}`}
    backgroundColor="#eeeeee"
    foregroundColor="#ffffff"
    style={styles.loader}
  >
    {/* 전체 이미지를 커버하는 라운디드 사각형 */}
    <Rect
      x="0"
      y="0"
      rx="30"
      ry="30"
      width={CAROUSEL_WIDTH}
      height={CAROUSEL_HEIGHT}
    />
    {/* 제목 자리 */}
    <Rect
      x="16"
      y={CAROUSEL_HEIGHT - 80}
      rx="4"
      ry="4"
      width={CAROUSEL_WIDTH - 32}
      height="24"
    />
    {/* 날짜 자리 */}
    <Rect
      x="16"
      y={CAROUSEL_HEIGHT - 48}
      rx="3"
      ry="3"
      width={(CAROUSEL_WIDTH - 32) * 0.6}
      height="18"
    />
  </ContentLoader>
);

const styles = StyleSheet.create({
  loader: {
    borderRadius: 30,
    overflow: "hidden",
  },
});

export default ImageLoader;
