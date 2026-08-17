// import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './Repository/RepositoryList';
import AppBar from './AppBar';
import SignIn from './Signin/SignIn';
import theme from './theme';
import { Route, Routes, Navigate } from 'react-router-native';
import SingleRepository from './Repository/SingleRepository';
import CreateReviewForm from './Review/CreateReviewForm';
import MyReviewsContainer from './Review/MyReviewsContainer';
import SignUp from './Signin/SignUp';

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
        <Route path="create-review" element={<CreateReviewForm />} />
        <Route path="/my-reviews" element={<MyReviewsContainer />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </View>
  );
};

export default Main;