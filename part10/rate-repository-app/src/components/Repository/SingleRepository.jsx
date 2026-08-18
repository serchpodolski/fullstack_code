import { useParams } from "react-router-native";
import { FlatList, View, ActivityIndicator } from "react-native";
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
  // console.log(id);
  const { loading, error, repository, fetchMore, loadingMore } = useRepository({id, first: 3});

  if (loading && !repository) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  const reviews = repository.reviews ? repository.reviews.edges.map(edge => edge.node) : [];

  const hasNextPage = repository?.reviews?.pageInfo?.hasNextPage;

  const renderFooter = () => {
    if (loadingMore && hasNextPage) {
      // console.log('loadingMore');
      return <ActivityIndicator size="large" color="#0366d6" />;
    }
    return null;
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} showGithubButton />}
      ListHeaderComponentStyle={{ marginBottom: 20 }}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.05}
      ListFooterComponent={renderFooter}
    />
  )
};

export default SingleRepository;