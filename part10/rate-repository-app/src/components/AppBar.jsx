import { View, StyleSheet, Text , ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';


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
  return (
    <View style={{ backgroundColor: '#24292e' }} >
      <ScrollView horizontal>
        <View style={styles.container}>
          <Link to="/">
            <Text style={styles.barButton}>Repositories</Text>
          </Link>
          <Link to="/signin">
            <Text style={styles.barButton}>Sign in</Text>
          </Link>
        </View>       
      </ScrollView>
    </View>
  )
}

export default AppBar;