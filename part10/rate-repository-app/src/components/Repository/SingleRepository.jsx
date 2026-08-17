import { useParams } from "react-router-native";
import { FlatList, View } from "react-native";
// import theme from "../theme";
import Text from "../Text";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
// import formatDate from "../../utils/formatDate.js";
import ReviewItem from "../Review/ReviewItem";
import {styles} from "../../utils/styles";

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, error, repository } = useRepository(id);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  const reviews = repository.reviews ? repository.reviews.edges.map(edge => edge.node) : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} showGithubButton />}
      ListHeaderComponentStyle={{ marginBottom: 20 }}
    />
  )
};

export default SingleRepository;