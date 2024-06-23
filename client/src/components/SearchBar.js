import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { font } from './GlobalStyles';
import { IconBtnOnly } from './Icon';

export default function SearchBar(props) {
  return (
    <View style={styles.container}>
      <IconBtnOnly name="search1" />
      <TextInput
        style={(font.searchBarPlaceholder, { marginLeft: 10, flex: 1 })}
        placeholder="Search..."
        placeholderTextColor="#8B98B1"
        onChangeText={props.onChangeText}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 310,
    height: 42,
    backgroundColor: '#F9FAFB',
    paddingLeft: 20,
    borderColor: '#D7DCE4',
    borderWidth: 0.5,
    borderRadius: 16,
  },
});
