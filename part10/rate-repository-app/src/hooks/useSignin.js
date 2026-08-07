import { useMutation } from '@apollo/client/react';
import { SIGNIN_USER } from '../gql/queries';

const useSignin = () => {
  const [mutate, result] = useMutation(SIGNIN_USER);
  
  const signIn = async ({username, password}) => {
    const res = await mutate({variables: {credentials: {username, password}}})
    return res
  }
  return [signIn, result]
}

export default useSignin