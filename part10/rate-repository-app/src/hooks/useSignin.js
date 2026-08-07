import { useMutation, useApolloClient } from '@apollo/client/react';
import { SIGNIN_USER } from '../gql/queries';
// import { useContext } from 'react';
import useAuthStorage from './useAuthStorage';

const useSignin = () => {
  const [mutate, result] = useMutation(SIGNIN_USER);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  
  const signIn = async ({username, password}) => {
    const res = await mutate({variables: {credentials: {username, password}}})

    const accessToken = res?.data?.authenticate?.accessToken;

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();
    }
    return res
  }
  return [signIn, result]
}

export default useSignin