// import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from './theme';
import { Route, Routes, Navigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    // marginTop: Constants.statusBarHeight,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      {/* <Text>Rate Repository Application</Text> */}
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList /> } />
        <Route path="/signin" element={<SignIn /> } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;