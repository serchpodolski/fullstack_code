import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../../hooks/useRepositories';
import { Text } from 'react-native';
import { useState } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions';

const RepositoryList = () => {
  const [order, setOrder] = useState(SORT_OPTIONS[0].value);
  const {repositories, loading, error} = useRepositories(order);

  if(loading) return <Text>Loading...</Text>;
  if(error) return <Text>{error.message}</Text>;

  return <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder}/>
}

export default RepositoryList;