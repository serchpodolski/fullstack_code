import { useQuery} from '@apollo/client/react';
import {NetworkStatus } from '@apollo/client';
import { GET_REPOSITORIES } from '../gql/queries';

const useRepositories = (variables ={}) => {
  const { data, error, loading, refetch, fetchMore, networkStatus }= useQuery(GET_REPOSITORIES,
    { 
      variables: {
        orderBy: variables.orderBy,
        orderDirection: variables.orderDirection,
        searchKeyword: variables.searchKeyword,
        first: variables.first || 5,
      },
      fetchPolicy: 'cache-and-network', 
      notifyOnNetworkStatusChange: true,
    },
  );

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const handleFetchMore = () => {
    const canFetchMore = !loading 
      && data?.repositories.pageInfo.hasNextPage 
      && data?.repositories?.pageInfo?.endCursor
      && !loadingMore;

    if (!canFetchMore) return;

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  // data?.repositories.edges.map(edge => console.log(edge.node))
  const repositories = data?.repositories;
  // console.log(repositories)

  return { 
    repositories, 
    loading, 
    loadingMore,
    error, 
    refetch,
    fetchMore: handleFetchMore,
  };
}

export default useRepositories;