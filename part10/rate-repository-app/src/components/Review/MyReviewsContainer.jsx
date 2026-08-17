import { FlatList, View, Alert, Pressable } from "react-native";
import Text from "../Text";
import ReviewItem from "./ReviewItem";
import useMe from "../../hooks/useMe";
import { styles } from "../../utils/styles";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../../hooks/useDeleteReview";
import React from "react";
import theme from "../theme";

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewsContainer = () => {
  const { reviews, error, loading } = useMe();
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();
  // const reviews = data ? data.edges.map(edge => edge.node) : [];

  
  
  const handleViewRepository = (id) => {
    navigate(`/repository/${id}`);
  };
  
  const handleDeleteReview = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try{
              await deleteReview(id)
            } catch (e) {
              console.log(e)
            }
          }
        }
      ])
    };
    
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;
  
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />
          <View style={styles.reviewButtonContainer}>
            <Pressable onPress={() => handleViewRepository(item.repositoryId)} style={{width: '40%'}}>
              <Text style={styles.reviewContainerButton} >
                View repository
              </Text>
            </Pressable>
            <Pressable onPress={() => handleDeleteReview(item.id)} style={{width: '40%'}}>
              <Text style={[styles.reviewContainerButton, {backgroundColor: theme.colors.error}]} >
                Delete review
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviewsContainer;