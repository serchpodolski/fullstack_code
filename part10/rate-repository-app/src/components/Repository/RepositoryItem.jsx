import { View, StyleSheet } from 'react-native';
import Stats from './Stats';
import theme from '../theme';
import InfoCard from './InfoCard';

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
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={ styles.cardContainer }>
      <InfoCard {...item} />
      <View style={ styles.statsContainer } >
        <Stats title="Stars" total={item.stargazersCount} />
        <Stats title="Forks" total={item.forksCount} />
        <Stats title="Reviews" total={item.reviewCount} />
        <Stats title="Rating" total={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;