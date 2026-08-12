import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../../hooks/useRepositories';
import { Text } from 'react-native';


const RepositoryList = () => {
  const {repositories, loading, error} = useRepositories();

  if(loading) return <Text>Loading...</Text>;
  if(error) return <Text>{error.message}</Text>;

  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList;