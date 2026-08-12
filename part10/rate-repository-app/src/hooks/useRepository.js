import { GET_REPO_DETAILS } from '../gql/queries';
import { useQuery } from '@apollo/client/react';

const useRepository = (id) => {
  const { loading, error, data } = useQuery(GET_REPO_DETAILS, {
    variables: { id },
    fetchPolicy: 'cache-and-network'
  });

  return { 
    repository: data?.repository, 
    error, 
    loading 
  };
};

export default useRepository;