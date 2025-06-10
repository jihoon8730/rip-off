import { ScrollView, View, Text, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useAppTheme } from "@/app/_layout";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/queryKeys";
import axios from "axios";
import Constants from "expo-constants";
import { FestivalCommonItem, FestivalIntroItem } from "@/types/festival";
import { Calendar, Clock3 } from "lucide-react-native";
import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import PlaceAddr from "@/app/(tabs)/(home)/details/components/PlaceAddr";

const { SERVICE_KEY_DECODING } = Constants.expoConfig?.extra ?? {};

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const animationRef = useRef<LottieView>(null);
  const {
    colors: { backgroundColor },
  } = useAppTheme();

  const { data: commonData, isLoading: commonLoading } = useQuery({
    queryKey: [QUERY_KEYS.FESTIVAL.DETAILS_COMMON, id],
    queryFn: async (): Promise<FestivalCommonItem> => {
      const response = await axios.get(
        "https://apis.data.go.kr/B551011/KorService2/detailCommon2",
        {
          params: {
            serviceKey: SERVICE_KEY_DECODING,
            contentId: id,
            MobileApp: "ripoff",
            MobileOS: "ETC",
            _type: "json",
          },
        }
      );
      return response.data.response.body.items.item[0];
    },
  });

  const { data: introData, isLoading: introLoading } = useQuery({
    queryKey: [QUERY_KEYS.FESTIVAL.DETAILS_INTRO, id],
    queryFn: async (): Promise<FestivalIntroItem> => {
      const response = await axios.get(
        "https://apis.data.go.kr/B551011/KorService2/detailIntro2",
        {
          params: {
            serviceKey: SERVICE_KEY_DECODING,
            contentId: id,
            contentTypeId: "15",
            MobileApp: "ripoff",
            MobileOS: "ETC",
            _type: "json",
          },
        }
      );
      return response.data.response.body.items.item[0];
    },
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={{ paddingBottom: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        {commonLoading && introLoading ? (
          <View style={styles.loadingContainer}>
            <LottieView
              ref={animationRef}
              source={require("../../../../assets/loading-animation.json")}
              style={styles.animation}
              loop
              autoPlay
            />
          </View>
        ) : (
          commonData?.firstimage && (
            <>
              <Image
                source={{
                  uri: commonData.firstimage ?? commonData.firstimage2,
                }}
                style={styles.image}
                resizeMode="cover"
              />

              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.9)"]}
                style={styles.gradient}
              >
                <Text style={styles.title}>{commonData.title}</Text>
                <View style={styles.flexRowBox}>
                  <View style={styles.dateBox}>
                    <Calendar
                      color="#FFFFFF"
                      size={20}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.dateText}>
                      {introData?.eventstartdate
                        ? `${introData.eventstartdate
                          .replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3")
                          .slice(2)} - ${introData.eventenddate
                          .replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3")
                          .slice(2)}`
                        : ""}
                    </Text>
                  </View>
                  <View style={styles.timeBox}>
                    <Clock3
                      color="#FFFFFF"
                      size={20}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.dateText}>
                      {introData?.playtime
                        ? introData.playtime
                          .split("(")[0]
                          .replace(/(\d{2})(\d{2})/, "$1:$2")
                        : ""}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </>
          )
        )}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.descriptionBox}>
          <Text
            numberOfLines={isExpanded ? undefined : 2}
            style={styles.overviewText}
          >
            {commonData?.overview.trim()}
          </Text>
          {Number(commonData?.overview?.length) > 0 && (
            <Pressable onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={styles.toggleText}>
                {isExpanded ? "접기" : "더보기"}
              </Text>
            </Pressable>
          )}
        </View>

        <PlaceAddr
          addr={commonData?.addr1 ?? "주소 정보가 없습니다."}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 450,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 400,
    justifyContent: "flex-end",
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  flexRowBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  timeBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 16,
  },
  animation: {
    width: 150,
    height: 150,
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  descriptionBox: {
    marginBottom: 16,
  },
  overviewText: {
    fontSize: 14,
    lineHeight: 20,
  },
  toggleText: {
    color: "#5E41E1",
    marginTop: 8,
    fontWeight: "600",
  },
});
