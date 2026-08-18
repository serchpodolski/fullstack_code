import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../../hooks/useRepositories';
import { Text } from 'react-native';
import { useState } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions';
import { useDebounce } from 'use-debounce';

const RepositoryList = () => {
  const [order, setOrder] = useState(SORT_OPTIONS[0].value);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  
  const {repositories, loading, error, fetchMore, loadingMore } = useRepositories(
    {
      ...order,
      first:5,
      searchKeyword: debouncedSearchQuery
    }
  );

  // if(loading) return <Text>Loading...</Text>;
  if(error) return <Text>{error.message}</Text>;

  return <RepositoryListContainer 
            repositories={repositories} 
            order={order} 
            setOrder={setOrder}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
            onEndReached={fetchMore}
            loadingMore={loadingMore}
          />
}

export default RepositoryList;