import { CREATE_REVIEW, GET_REPOSITORIES } from "../gql/queries";
import { useMutation } from "@apollo/client/react";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  
  const createReview = async ({ownerName, repositoryName, rating, text}) => {
    const payload = {
      ownerName,
      repositoryName,
      rating: Number(rating),
      text,
    };

    const { data } = await mutate({
      variables: {
        review: payload,
      },
      refetchQueries: [
        { query: GET_REPOSITORIES },
      ]
    });

    return data;
  };

  return [createReview, result];
};

export default useCreateReview;