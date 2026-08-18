import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import RepositoryItem from './RepositoryItem';
// import useRepositories from '../../hooks/useRepositories';
import RepositoryListHeader from './RepositoryListHeader';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ 
    repositories, 
    order, 
    setOrder, 
    searchQuery, 
    setSearchQuery, 
    loading, 
    onEndReached,
    loadingMore
  }) => {

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderFooter = () => {
    if (loadingMore) {
      console.log('loadingMore');
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="large" color="#0366d6" />
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={
        <RepositoryListHeader 
          order={order} 
          setOrder={setOrder}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading} 
        />
      }
      ListFooterComponent={renderFooter}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.15}
    />
  );
};

export default RepositoryListContainer;