import { FlatList, View } from "react-native";
import Text from "../Text";
import ReviewItem from "./ReviewItem";
import useMe from "../../hooks/useMe";
import {styles} from "../../utils/styles";

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewsContainer = () => {
  const { reviews, error, loading } = useMe();
  // const reviews = data ? data.edges.map(edge => edge.node) : [];

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviewsContainer;