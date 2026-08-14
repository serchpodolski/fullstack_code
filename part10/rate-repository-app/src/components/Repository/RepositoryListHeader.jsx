import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SORT_OPTIONS } from "../../constants/sortOptions";
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
  }
});

const RepositoryListHeader = ({ order, setOrder }) => {
  return (
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
  );
};

export default RepositoryListHeader;