import Text from "./Text";
import theme from "./theme";
import { View, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    backgroundColor: theme.colors.repositoryBackground,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  infoContainer: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: theme.colors.repositoryBackground,
    width: "80%"
  },
  languageText: {
    color: theme.colors.repositoryBackground,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.normal,
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
  },
  descriptionText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
    paddingBottom: 10
  },
  fullNameText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingBottom: 5
  },
  image: {
    width: 50,
    height: 50,
    padding: 5,
    borderRadius: 5,
  },
});

const InfoCard = ({ fullName, description, language, ownerAvatarUrl }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.fullNameText}>{fullName}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
        <Text style={styles.languageText}>{language}</Text>
      </View>
    </View>
  );
};

export default InfoCard;