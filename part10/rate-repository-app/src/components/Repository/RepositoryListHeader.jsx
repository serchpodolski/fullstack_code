import React from "react";
import { View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SORT_OPTIONS } from "../../constants/sortOptions";
import { Ionicons } from '@expo/vector-icons';
import theme from "../theme";

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#e1e5e8',
    marginVertical: 10,
    marginHorizontal: 0,
  },
  picker: {
    backgroundColor: '#ffffff',
    fontSize: theme.fontSizes.subheading
  },
  pickerItem: {
    color: theme.colors.textPrimary
  },
  searchInput: {
    backgroundColor: '#ffffff',
    fontSize: theme.fontSizes.subheading,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary
  },
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  loadingSpinner: {
    position: 'absolute',
    right: 12,
  },
  searchIcon: {
    position: 'absolute',
    right: 12,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textSecondary,
    size: 30
  }
});

const RepositoryListHeader = ({ order, setOrder, serachQuery, setSearchQuery, loading }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search..."
          value={serachQuery}
          onChangeText={(text) => setSearchQuery(text)}
          clearButtonMode="while-editing"
        />
        {
          loading ? (
            <ActivityIndicator 
              size="small" 
              style={styles.loadingSpinner} 
              color={theme.colors.primary} 
            />
          ) : (
            <Ionicons 
              name="search"
              style={styles.loadingSpinner}
              size={theme.fontSizes.subheading}
            />
          )
          }
      </View>
      <View style={styles.headerContainer}>
        <Picker
          selectedValue={order}
          onValueChange={(itemValue) => setOrder(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select an item" value="" 
              style={styles.pickerItem && { color: theme.colors.textSecondary }} 
              enabled={false}/>
          {SORT_OPTIONS.map((option) => (
            <Picker.Item
              key={option.label}
              label={option.label}
              value={option.value}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default RepositoryListHeader;