import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/app/_layout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FestivalItem } from "@/types/festival";
import HomeCarousel from "@/app/(tabs)/(home)/component/HomeCarousel";
import { useRef, useState } from "react";
import Constants from "expo-constants";
import { AreaItem } from "@/types/area";
import AreaTags from "@/app/(tabs)/(home)/component/AreaTags";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";
import { Link } from "expo-router";
import { QUERY_KEYS } from "@/app/queryKeys";

const { SERVICE_KEY_DECODING } = Constants.expoConfig?.extra ?? {};

const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().slice(0, 10).replace(/-/g, "");
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const {
    colors: { backgroundColor },
  } = useAppTheme();
  const animationRef = useRef<LottieView>(null);
  const [areaCode, setAreaCode] = useState("");

  // 축제 목록 조회
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.FESTIVAL.HOME, areaCode],
    queryFn: async (): Promise<FestivalItem[]> => {
      const response = await axios.get(
        "https://apis.data.go.kr/B551011/KorService2/searchFestival2",
        {
          params: {
            serviceKey: SERVICE_KEY_DECODING,
            MobileApp: "ripoff",
            MobileOS: "ETC",
            numOfRows: 50,
            eventStartDate: getCurrentDate(),
            areaCode: areaCode || "", // 선택된 지역코드
            arrange: "R",
            _type: "json",
          },
        },
      );
      return response.data.response.body.items.item;
    },
  });

  // 지역 코드 목록 조회
  const { data: areaData } = useQuery({
    queryKey: [QUERY_KEYS.AREA.LIST],
    queryFn: async (): Promise<AreaItem[]> => {
      const response = await axios.get(
        "https://apis.data.go.kr/B551011/KorService2/areaCode2",
        {
          params: {
            serviceKey: SERVICE_KEY_DECODING, // 인증키
            MobileApp: "ripoff",
            MobileOS: "ETC",
            // pageNo: 1, // 페이지 번호
            numOfRows: 30, // 한 페이지 결과 수
            _type: "json", // 응답 포맷
          },
        },
      );
      return response.data.response.body.items.item;
    },
  });

  return (
    <LinearGradient
      colors={["#5E41E1", "#3E5EEA", "#4BA2F6"]}
      start={[0, 1]}
      end={[1, 1]}
      style={[
        styles.innerContainer,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <Link href="/search" asChild>
        <Pressable style={styles.searchButton}>
          <Search color="#eeeeee" size={16} />
          <Text style={styles.searchText}>바가지 축제를 검색</Text>
        </Pressable>
      </Link>
      <View style={[styles.mainContainer, { backgroundColor }]}>
        <View style={styles.FlexRowBox}>
          <Text style={styles.h1Text}>축제</Text>
        </View>
        <AreaTags
          areaData={areaData || []}
          onSelect={(code) => {
            setAreaCode(code || "");
          }}
        />

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <LottieView
              ref={animationRef}
              source={require("../../../assets/loading-animation.json")}
              style={styles.animation}
              loop={true}
              // speed={1.5}
              // autoPlay 대신 useEffect에서 play() 호출
              autoPlay
            />
          </View>
        ) : (
          <HomeCarousel data={data || []} isLoading={isLoading} />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  mainContainer: {
    flex: 1,
    marginTop: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 12,
    marginHorizontal: 24,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  searchText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  FlexRowBox: {
    marginTop: 28,
    paddingHorizontal: 10,
  },
  h1Text: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  animation: { width: 150, height: 150, marginTop: -80 },
});
