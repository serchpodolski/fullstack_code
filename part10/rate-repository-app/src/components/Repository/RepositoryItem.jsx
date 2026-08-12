import { View, StyleSheet, Pressable, Linking } from 'react-native';
import Stats from './Stats';
import Text from '../Text';
import theme from '../theme';
import InfoCard from './InfoCard';
import { useNavigate } from 'react-router-native';
// import { openURL } from 'expo-linking';

const styles = StyleSheet.create({
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
  }
});

const RepositoryItem = ({ item, showGithubButton }) => {
  const navigate = useNavigate();

  if (!item) return null;

  return (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <View testID="repositoryItem" style={ styles.cardContainer }>
        <InfoCard {...item} />
        <View style={ styles.statsContainer } >
          <Stats title="Stars" total={item.stargazersCount} />
          <Stats title="Forks" total={item.forksCount} />
          <Stats title="Reviews" total={item.reviewCount} />
          <Stats title="Rating" total={item.ratingAverage} />
        </View>
        {
          showGithubButton && item.url && (
          <Pressable style={ styles.button } onPress={() => Linking.openURL(item.url)}>
            <Text style={ styles.buttonText }>Open in Github</Text>
          </Pressable>
          )
        }
      </View>
    </Pressable>
  );
};

export default RepositoryItem;