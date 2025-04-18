import * as React from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { FestivalItem } from "@/types/festival";
import { parse, format } from "date-fns";
import { ko } from "date-fns/locale";
import ImageLoader from "@/app/component/home/ImageLoader";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const CAROUSEL_HEIGHT = SCREEN_HEIGHT * 0.5;
const CAROUSEL_WIDTH = SCREEN_WIDTH * 0.9;

export default function HomeCarousel({
  data,
  isLoading,
}: {
  data: FestivalItem[];
  isLoading: boolean;
}) {
  const progress = useSharedValue<number>(0);

  return (
    <View id="carousel-component" style={{ flex: 1 }}>
      <Carousel
        autoPlay
        autoPlayInterval={3000}
        data={data}
        width={CAROUSEL_WIDTH}
        height={CAROUSEL_HEIGHT}
        loop
        pagingEnabled
        snapEnabled
        style={{ width: "100%", height: CAROUSEL_HEIGHT }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={({ item }: { item: FestivalItem }) => {
          const startDate = parse(item?.eventstartdate, "yyyyMMdd", new Date());
          const endDate = parse(item?.eventenddate, "yyyyMMdd", new Date());
          const startFormatted = format(startDate, "yyyy년 MM월 dd일", {
            locale: ko,
          });
          const endFormatted = format(endDate, "yyyy년 MM월 dd일", {
            locale: ko,
          });

          return (
            <View style={styles.renderItemView}>
              {isLoading ? (
                <ImageLoader />
              ) : (
                <ImageBackground
                  source={{ uri: item?.firstimage }}
                  style={styles.renderItemView}
                  imageStyle={styles.imageStyle}
                >
                  <View style={styles.overlay}>
                    <Text style={styles.title}>{item?.title}</Text>
                    <View>
                      <Text
                        style={styles.date}
                      >{`일시 : ${startFormatted} ~ ${endFormatted}`}</Text>
                    </View>
                  </View>
                </ImageBackground>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  renderItemView: {
    width: CAROUSEL_WIDTH,
    height: CAROUSEL_HEIGHT,
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 30,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  overlay: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // 반투명 검정색
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
  },
  flexRow: {
    flexDirection: "row",
  },
});
