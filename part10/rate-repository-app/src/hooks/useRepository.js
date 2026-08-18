import { GET_REPO_DETAILS } from '../gql/queries';
import { useQuery } from '@apollo/client/react';

const useRepository = (variables = {}) =>  {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_REPO_DETAILS, {
    variables: { 
      id: variables.id,
      first: variables.first || 2
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading 
      && data?.repository.reviews.pageInfo.hasNextPage 
      && data?.repository?.reviews?.pageInfo?.endCursor;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  }

  return { 
    repository: data?.repository, 
    error, 
    loading,
    loadingMore: networkStatus === 7,
    fetchMore: handleFetchMore 
  };
};

export default useRepository;