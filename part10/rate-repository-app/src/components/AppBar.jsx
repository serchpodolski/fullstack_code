import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container:{
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#24292e',
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
    <View style={styles.container}>
      <Pressable >
        <Text style={styles.barButton}>Repositories</Text>
      </Pressable>
    </View>
  )
}

export default AppBar;