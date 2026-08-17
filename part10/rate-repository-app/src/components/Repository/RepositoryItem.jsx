import { View, StyleSheet, Pressable, Linking } from 'react-native';
import Stats from './Stats';
import Text from '../Text';
import theme from '../theme';
import InfoCard from './InfoCard';
import { useNavigate } from 'react-router-native';
// import { openURL } from 'expo-linking';
import {styles} from '../../utils/styles';

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