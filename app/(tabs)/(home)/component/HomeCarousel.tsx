import * as React from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import { ImageBackground } from "expo-image";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { FestivalItem } from "@/types/festival";
import { parse, format } from "date-fns";
import { ko } from "date-fns/locale";
import ImageLoader from "@/app/(tabs)/(home)/component/ImageLoader";
import { Link } from "expo-router";
import { Calendar } from "lucide-react-native";

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
    <View id="carousel-component" style={styles.container}>
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
          parallaxScrollingOffset: 30,
        }}
        onProgressChange={progress}
        renderItem={({ item }: { item: FestivalItem }) => {
          const startDate = parse(item?.eventstartdate, "yyyyMMdd", new Date());
          const endDate = parse(item?.eventenddate, "yyyyMMdd", new Date());
          const startFormatted = format(startDate, "yy.MM.dd", {
            locale: ko,
          });
          const endFormatted = format(endDate, "yy.MM.dd", {
            locale: ko,
          });

          return (
            <View style={styles.renderItemView}>
              {isLoading ? (
                <ImageLoader />
              ) : (
                <Link
                  href={{
                    pathname: "/details/[id]",
                    params: { id: item?.contentid },
                  }}
                >
                  <ImageBackground
                    source={{ uri: item?.firstimage }}
                    style={styles.renderItemView}
                    contentFit="cover"
                    transition={1000}
                    placeholder="썸네일 이미지 로딩 중..."
                  >
                    <View style={styles.overlay}>
                      <Text
                        style={styles.title}
                        numberOfLines={1} // 최대 1줄
                        ellipsizeMode="tail"
                      >
                        {item?.title}
                      </Text>
                      <View style={styles.dateBox}>
                        <Calendar size={20} color={"#111111"} />
                        <Text
                          style={styles.date}
                        >{`${startFormatted} ~ ${endFormatted}`}</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </Link>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  renderItemView: {
    width: CAROUSEL_WIDTH,
    height: CAROUSEL_HEIGHT,
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 30,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
  overlay: {
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // 반투명
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  title: {
    color: "#111111",
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    color: "#111111",
    fontSize: 16,
    marginTop: 4,
  },
  flexRow: {
    flexDirection: "row",
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
});
