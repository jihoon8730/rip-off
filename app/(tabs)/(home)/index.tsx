import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  search: string;
};

export default function HomeScreen() {
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
    <View style={styles.innerContainer}>
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
    backgroundColor: "#242E3C",
  },
  searchBar: {
    backgroundColor: "#30394A",
  },
  inputStyle: {
    color: "#808A97",
  },
});
