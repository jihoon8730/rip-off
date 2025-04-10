import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useAppTheme } from "@/app/_layout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type FormData = {
  search: string;
};

export default function HomeScreen() {
  const {
    colors: { backgroundColor },
  } = useAppTheme();

  const { data } = useQuery({
    queryKey: ["test-data"],
    queryFn: async () => {
      return await axios.get("");
    },
  });

  console.log("data", data);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("검색어:", data.search);
    // 검색 로직 구현
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
            style={styles.searchBar}
            inputStyle={styles.inputStyle}
            elevation={1}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: "#30394A",
  },
  inputStyle: {
    color: "#808A97",
  },
});
