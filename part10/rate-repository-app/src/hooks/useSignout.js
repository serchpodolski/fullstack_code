import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client/react';

const useSignout = () => {
  const apolloClient = useApolloClient(); 
  const authStorage = useAuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }

  return [signOut]
};

export default useSignout;