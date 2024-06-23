// AddSpend.js
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Button from '../src/components/Button';
import Header from '../src/components/Header';
import MoneyInput from '../src/components/MoneyInput';
import { font } from '../src/components/GlobalStyles';
import Check from '../src/components/Check';
import { useAuth } from '../AuthContext';

export default function Setting({ route, navigation }) {
  const { initialBalance } = route.params;
  const { budget, setBudgetAmount } = useAuth();
  const [inputAmount, setInputAmount] = useState('');
  const [currentBudget, setCurrentBudget] = useState(initialBalance.account_balance);
  const [dataApproved, setDataApproved] = useState(false);
  const [checkIsShowing, setCheckIsShowing] = useState(false);



  return (
    <SafeAreaView style={styles.container}>
      {/* check png */}
      {checkIsShowing ? (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: '1',
            flex: 1,
            backgroundColor: 'white',
            paddingVertical: 600,
            paddingHorizontal: 140,
          }}
        >
          <Check />
        </View>
      ) : null}
      {/* header */}
      <Header
        headerName={`Add Spending`}
        style={styles}
        navigation={navigation}
        pageName={'Setting'}
        icon={'home'}
        navigateTo={'Home'}
        iconDisplay={true}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderTopStartRadius: 70,
          borderTopEndRadius: 4,
          borderBottomStartRadius: 4,
          borderBottomEndRadius: 4,
          backgroundColor: '#8438FF',
          padding: 50,
          marginBottom: 100,
          marginTop: 30,
          shadowColor: '#9F8EBC',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.7,
          shadowRadius: 1.41,

          elevation: 2,
        }}
      >
        <Text style={[font.cardFont, { paddingBottom: 20 }]}>
          Your current budget goal{' '}
        </Text>
        <Text style={[font.bigWhite]}>{`£ ${budget}`}</Text>
      </View>

      <MoneyInput
        mainCopy={`Change it to`}
        placeholder={`£`}
        value={inputAmount}
        onChangeText={setInputAmount}
        keyboardType={`numeric`}
        styles={styles}
      />
      <Button
        navigation={navigation}
        dataApproved={dataApproved}
        btnCopy={`Save your change`}
        callBack={() => setBudgetAmount(inputAmount)}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    borderWidth: 1,
  },
  input_container: {
    // marginTop: 300,
    alignItems: 'center',
  },
});