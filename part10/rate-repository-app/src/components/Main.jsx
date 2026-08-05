// import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            {/* <Text>Rate Repository Application</Text> */}
            <AppBar />
            <RepositoryList />
        </View>
    );
};

export default Main;