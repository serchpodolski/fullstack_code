import { useQuery } from '@apollo/client/react';
import { GET_ME } from '../gql/queries';

const useMe = () => {
  const { data, error, loading } = useQuery(GET_ME, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all'
  });

  const me = data?.me;
  const reviews = me?.reviews ? me.reviews.edges.map(edge => edge.node) : [];
  console.log(reviews);
  
  return {
    me,
    reviews,
    error,
    loading
  }
};

export default useMe;