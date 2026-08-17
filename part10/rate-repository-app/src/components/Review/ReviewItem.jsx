import Text from '../Text';
import { View } from 'react-native';
import formatDate from '../../utils/formatDate';
import {styles} from '../../utils/styles';

const ReviewItem = ({ review }) => {

  const headerTitle = review.repository?.fullName || review.user?.username || 'Anonimous';
  return (
    <View style={styles.reviewCard}>
      <Text style={styles.ratingCardContainer}>{review.rating}</Text>
      <View style={styles.reviewCardContainer}>
        <Text style={styles.username}>{headerTitle}</Text>
        <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        <Text style={styles.description}>{review.text}</Text>
      </View>
    </View>
  );
}

export default ReviewItem;