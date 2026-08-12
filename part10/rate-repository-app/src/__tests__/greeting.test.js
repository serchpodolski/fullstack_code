import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { render } from '@testing-library/react-native';


const CustomText = ({ children }) => <Text>{children}</Text>;

function HomeScreen() {
  return (
    <View style={styles.container}>
      <CustomText>Welcome!</CustomText>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', async () => {
    const { getByText } = await render(<HomeScreen />);

    getByText('Welcome!');
  });
});
