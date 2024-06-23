import React, { useEffect } from 'react';
import { SafeAreaView, View, Image } from 'react-native';

const Check = ({ navigation }) => {
  //   navigation.navigate('Home');

  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       setTimeout(function () {
  //         console.log('heelo');
  //         navigation.navigate('Home');
  //       }, 20);
  //     });
  //     return unsubscribe;
  //   }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../assets/Check.png')}
          style={{ width: 140, height: 140 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Check;
