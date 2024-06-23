import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import IconButton from './Icon';
import { font } from './GlobalStyles';

export default function Header(props) {
  const [iconDisplay, setIconDisplay] = useState(
    props.iconDisplay ? props.iconDisplay : false
  );

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 20,
          padding: 14,
          bottom: 20,
          display: iconDisplay ? 'block' : 'none',
        }}
        onPress={() => {
          props.navigation.navigate(props.navigateTo);
        }}
      >
        <IconButton name={props.icon} />
      </TouchableOpacity>
      <Text
        style={[
          font.primary,
          { justifyContent: 'flex-end', padding: 30, marginBottom: 24 },
        ]}
      >
        {props.pageName}
      </Text>
    </View>
  );
}
