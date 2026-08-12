import { useParams } from "react-router-native";
import { Text } from "react-native";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, error, repository } = useRepository(id);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  return <RepositoryItem item={repository} showGithubButton />;
};

export default SingleRepository;