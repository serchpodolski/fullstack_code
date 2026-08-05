import { View, StyleSheet } from 'react-native';
import theme from './theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  statNumberText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  },
  statText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.normal
  }
})

const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number).toLowerCase();
};

const Stats = ({ title, total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.statNumberText}>{formatNumber(total)}</Text>
      <Text style={styles.statText}>{title}</Text>
    </View>
  )
}

export default Stats;