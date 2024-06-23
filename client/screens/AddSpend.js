import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import Button from '../src/components/Button';
import Header from '../src/components/Header';
import MoneyInput from '../src/components/MoneyInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Check from '../src/components/Check';
import { font } from '../src/components/GlobalStyles';
import { useAuth } from '../AuthContext'; // Import the AuthContext

export default function AddSpend({ navigation }) {
  const { token } = useAuth(); // Retrieve token from context
  const [inputAmount, setInputAmount] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [dataApproved, setDataApproved] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [inputDate, setInputDate] = useState(moment().format('D.M.YYYY'));
  const [dateForPost, setDateForPost] = useState(new Date());
  const [checkIsShowing, setCheckIsShowing] = useState(false);

  const placeholder = 'Click to change the date';

  const postSpending = async () => {
    try {
      if (inputAmount && inputDescription) {
        setDataApproved(true);
        const spendData = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
          body: JSON.stringify({
            amount: `-${inputAmount}`,
            created: dateForPost.toISOString(),
            description: inputDescription,
            spending: true,
          }),
        };
        await fetch('http://localhost:3001/api/transaction', spendData);
        setCheckIsShowing(true);
        setTimeout(function () {
          navigation.navigate('Home');
        }, 1000);
      } else {
        alert('Please fill up inputs');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format('D.M.YYYY');
    setDateForPost(date);
    setInputDate(formattedDate);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      {checkIsShowing && (
        <View style={styles.overlay}>
          <Check />
        </View>
      )}

      <Header
        headerName={`Add Spending`}
        style={styles}
        navigation={navigation}
        pageName={'Add Spending'}
        icon={'home'}
        navigateTo={'Home'}
        iconDisplay={true}
      />

      <View style={styles.centeredContainer}>
        <MoneyInput
          mainCopy={`How much did you spend?`}
          placeholder={`£`}
          value={inputAmount}
          onChangeText={setInputAmount}
          keyboardType={`numeric`}
          styles={styles}
        />
        <MoneyInput
          mainCopy={`Description?`}
          placeholder={`eg. Spotify subscription`}
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
      
      <Button callBack={postSpending} dataApproved={dataApproved} btnCopy={`Save`} />
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
  lineStyle: {
    marginTop: -2,
    borderWidth: 0.5,
    width: 240,
    opacity: 0.5,
    margin: 10,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
