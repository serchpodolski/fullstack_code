import { DELETE_REVIEW, GET_ME } from "../gql/queries";
import { useMutation } from "@apollo/client/react";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW,{
    refetchQueries: [
      { 
        query: GET_ME,
        variables: { includeReviews: true }
      }],
    
  });

  const deleteReview = async (id) => {
    await mutate({variables: {id}})
  }

  return [deleteReview, result];
};

export default useDeleteReview;