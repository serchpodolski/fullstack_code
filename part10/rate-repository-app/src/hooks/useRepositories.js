import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../gql/queries';

const useRepositories = () => {
  const { data, error, loading, refetch }= useQuery(GET_REPOSITORIES,
    { fetchPolicy: 'cache-and-network' }
  );

  // data?.repositories.edges.map(edge => console.log(edge.node))
  const repositories = data?.repositories;
  console.log(repositories)

  return { repositories, loading, error, refetch };
}

export default useRepositories;