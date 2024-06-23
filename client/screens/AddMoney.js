import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'; // Import necessary components from 'react-native' (or your UI library)

import Button from '../src/components/Button';
import Header from '../src/components/Header';
import MoneyInput from '../src/components/MoneyInput';
import Check from '../src/components/Check';
import { font } from '../src/components/GlobalStyles';
import moment from 'moment';
import { useAuth } from '../AuthContext'; // Import the AuthContext

export default function AddMoney({ navigation }) {
  const { token, budget } = useAuth(); // Use the necessary values from AuthContext
  const [inputAmount, setInputAmount] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [dataApproved, setDataApproved] = useState(false);
  const [checkIsShowing, setCheckIsShowing] = useState(false);
  const [inputDate, setInputDate] = useState(moment().format('YYYY-MM-DD'));

  const placeholder = 'Click to change the date';

  const postAddMoney = async () => {
    try {
      if (inputAmount && inputDescription) {
        setDataApproved(true);
        const addMoney = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: `${inputAmount}`,
            created: inputDate, // Send date in YYYY-MM-DD format
            description: inputDescription,
            addMoney: true,
          }),
        };
        const response = await fetch('http://localhost:3001/api/transaction', addMoney);
        if (response.ok) {
          const newBalance = parseFloat(budget) + parseFloat(inputAmount);
          setCheckIsShowing(true);
          setTimeout(function () {
            navigation.navigate('Home');
          }, 1000);
        } else {
          alert('Failed to add money. Please try again.');
        }
      } else {
        alert('Please fill up inputs');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Check mark */}
      {checkIsShowing && (
        <View style={styles.overlay}>
          <Check />
        </View>
      )}

      <Header
        headerName={`Add Money`}
        style={styles}
        navigation={navigation}
        pageName={'Add Money'}
        icon={'home'}
        navigateTo={'Home'}
        iconDisplay={true}
      />

      <View style={styles.centeredContainer}>
        <MoneyInput
          mainCopy={`How much do you want to put?`}
          placeholder={`£`}
          value={inputAmount}
          onChangeText={setInputAmount}
          keyboardType={`numeric`}
          styles={styles}
        />
        <MoneyInput
          mainCopy={`Description?`}
          placeholder={`ex. Refund from Apple`}
          value={inputDescription}
          onChangeText={setInputDescription}
          styles={styles}
        />

        <Text style={font.primary}>{'Pick your date'}</Text>

        <input
          type="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          
        />
      </View>
      
      <Button callBack={postAddMoney} dataApproved={dataApproved} btnCopy={`Save`} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput1: {
    fontSize: 16,
    height: 50,
    width: 260,
    opacity: 0.4,
    padding: 8,
    marginBottom: -3,
    textAlign: 'center',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
