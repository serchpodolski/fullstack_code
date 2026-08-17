import { StyleSheet } from 'react-native';
import theme from '../components/theme';
import Constants from 'expo-constants';

const WIDTH_SIZE = 50;
export const styles = StyleSheet.create({
  statsContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: theme.colors.repositoryBackground
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: theme.colors.repositoryBackground
  },
  button: {
    backgroundColor: theme.colors.primary,
    width: '95%',
    margin: 'auto',
    marginTop: 5,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  },
  separator: {
    height: 10,
  },
  reviewCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.repositoryBackground,
    width: '100%',
    margin: 'auto'
  },
  ratingCardContainer: {
    padding: 10,
    marginTop: 20,
    marginLeft: 15,
    backgroundColor: theme.colors.repositoryBackground,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    width: WIDTH_SIZE,
    height: WIDTH_SIZE,
    borderRadius: WIDTH_SIZE / 2,
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.primary
  },
  reviewCardContainer: {
    backgroundColor: theme.colors.repositoryBackground,
    padding: 5,
    marginTop: 15,
    marginRight: 10,
    marginBottom: 10, width: '80%'
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    // marginBottom: 5
  },
  date: {
    marginBottom: 10
  },
  description: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body
  },
  appBarContainer:{
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#24292e',
    width: '100%'
  },
  appBarButton: {
    paddingHorizontal: 10,
    paddingVertical: 25,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  reviewButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.repositoryBackground,
    paddingBottom: 10
  },
  reviewContainerButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 10,
    color: theme.colors.repositoryBackground,
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    borderRadius: 5
  }
});