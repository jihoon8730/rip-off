import { StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
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

const { SERVICE_KEY_DECODING } = Constants.expoConfig?.extra ?? {};

type FormData = {
  search: string;
};

export default function HomeScreen() {
  const {
    colors: { backgroundColor },
  } = useAppTheme();
  const animationRef = useRef<LottieView>(null);

  const [search, setSearch] = useState("");
  const [areaCode, setAreaCode] = useState("");

  // 축제 목록 조회
  const { data, isLoading } = useQuery({
    queryKey: ["festival-list", areaCode, search],
    queryFn: async (): Promise<FestivalItem[]> => {
      const response = await axios.get(
        "https://apis.data.go.kr/B551011/KorService1/searchFestival1",
        {
          params: {
            serviceKey: SERVICE_KEY_DECODING,
            MobileApp: "ripoff",
            MobileOS: "ETC",
            numOfRows: 50,
            eventStartDate: "20240101",
            areaCode: areaCode || "", // 선택된 지역코드
            listYN: "Y",
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
    queryKey: ["area-code-list"],
    queryFn: async (): Promise<AreaItem[]> => {
      const response = await axios.get(
        "https://apis.data.go.kr/B551011/KorService1/areaCode1",
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

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("검색어:", data.search);
    // 검색 로직 구현
    setSearch(data.search);
  };

  return (
    <View
      style={[
        styles.innerContainer,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Controller
        control={control}
        name="search"
        render={({ field: { onChange, value } }) => (
          <Searchbar
            placeholder="검색"
            placeholderTextColor="#808A97"
            onChangeText={onChange}
            value={value}
            onSubmitEditing={handleSubmit(onSubmit)}
            iconColor="#909CA8"
            style={[styles.searchBar, { backgroundColor: backgroundColor }]}
            elevation={1}
          />
        )}
      />
      <View style={styles.FlexRowBox}>
        <Text style={styles.h1Text}>바가지 축제</Text>
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
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
  },
  searchBar: {
    marginTop: 20,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  FlexRowBox: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  h1Text: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: { width: 150, height: 150 },
});
