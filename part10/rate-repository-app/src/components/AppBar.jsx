import { View, StyleSheet, Text , ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link, useNavigate } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { GET_ME} from '../gql/queries';
import useSignout from '../hooks/useSignout';


const styles = StyleSheet.create({
  container:{
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#24292e',
    width: '100%'
  },
  barButton: {
    padding: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

const AppBar = () => {
  const navigate = useNavigate();
  const { data } = useQuery(GET_ME, {fetchPolicy: 'cache-and-network', errorPolicy: 'all'});
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
        <View style={styles.container}>
          <Link to="/">
            <Text style={styles.barButton}>Repositories</Text>
          </Link>
          {
            me ? (
              <>
                <Pressable onPress={handleSignOut}>
                  <Text style={styles.barButton}>Sign out</Text>
                </Pressable>
                <Link to="/create-review">
                  <Text style={styles.barButton}>Create review</Text>
                </Link>
              </>
            ) : (
              <Link to="/signin">
                <Text style={styles.barButton}>Sign in</Text>
              </Link>
            )
          }
        </View>       
      </ScrollView>
    </View>
  )
}

export default AppBar;