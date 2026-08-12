import { useParams } from "react-router-native";
import { FlatList, View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "../Text";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import formatDate from "../../utils/formatDate.js";

const styeles = StyleSheet.create({
  separator: {
    height: 10,
  },
  containerCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.repositoryBackground,
    width: '100%',
    margin: 'auto'
  },
  ratingContainer: {
    padding: 10,
    marginTop: 20,
    marginLeft: 15,
    backgroundColor: theme.colors.repositoryBackground,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    width: 50,
    height: 50,
    borderRadius: width => width / 2,
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.primary
  },
  reviewContainer: {
    backgroundColor: theme.colors.repositoryBackground,
    padding: 5,
    marginTop: 15,
    marginRight: 10,
    marginBottom: 10, width: '80%'
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginBottom: 5
  },
  date: {
    marginBottom: 10
  },
  description: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body
  }
});



const ItemSeparator = () => <View style={styeles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styeles.containerCard}>
      <Text style={styeles.ratingContainer}>{review.rating}</Text>
      <View style={styeles.reviewContainer}>
        <Text style={styeles.username}>{review.user.username}</Text>
        <Text style={styeles.date}>{formatDate(review.createdAt)}</Text>
        <Text style={styeles.description}>{review.text}</Text>
      </View>
    </View>
  );
}


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