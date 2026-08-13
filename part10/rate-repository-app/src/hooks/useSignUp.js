import { useMutation } from '@apollo/client/react';
import { CREATE_USER } from '../gql/queries';

const useSignup = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({username, password}) => {
    const { data } = await mutate({
      variables: {
        user: {
          username,
          password
        },
      },
    });

    return data;
  } 


  return [ signUp, result ];

}

export default useSignup;