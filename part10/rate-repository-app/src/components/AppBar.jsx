import { View, ScrollView, Pressable } from 'react-native';
import Text from './Text';
import { Link, useNavigate } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { GET_ME} from '../gql/queries';
import useSignout from '../hooks/useSignout';
import {styles} from '../utils/styles';

const AppBar = () => {
  const navigate = useNavigate();
  const { data } = useQuery(GET_ME, 
                {
                  variables: {"includeReviews": false},
                  fetchPolicy: 'cache-and-network', 
                  errorPolicy: 'all'
                });
  const [signOut] = useSignout();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const me = data?.me;
  console.log(me);
  
  return (
    <View style={{ backgroundColor: '#24292e' }} >
      <ScrollView horizontal>
        <View style={styles.appBarContainer}>
          <Link to="/">
            <Text style={styles.appBarButton}>Repositories</Text>
          </Link>
          {
            me ? (
              <>
                <Link to="/create-review">
                  <Text style={styles.appBarButton}>Create review</Text>
                </Link>
                <Link to="/my-reviews">
                  <Text style={styles.appBarButton}>My reviews</Text>
                </Link>
                <Pressable onPress={handleSignOut}>
                  <Text style={styles.appBarButton}>Sign out</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Text style={styles.appBarButton}>Sign in</Text>
                </Link>
                <Link to="/signup">
                  <Text style={styles.appBarButton}>Sign up</Text>
                </Link>
              </>
            )
          }
        </View>       
      </ScrollView>
    </View>
  )
}

export default AppBar;