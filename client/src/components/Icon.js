import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { StyleSheet, View } from 'react-native';

function IconBtnOnly(props) {
  return (
    <View style={styles.iconBtnOnly}>
      <Icon name={props.name} size={20} color="#60708F" />
    </View>
  );
}

export default function IconButton(props) {
  return (
    <View style={styles.iconBtnContainer}>
      <Icon name={props.name} size={20} color="#60708F" />
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtnContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    borderColor: '#CACBCC',
    borderWidth: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F9FAFB',
  },
  iconBtnOnly: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { IconBtnOnly, IconButton };
