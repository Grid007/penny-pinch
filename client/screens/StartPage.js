// StartPage.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import MoneyInput from '../src/components/MoneyInput';
import Button from '../src/components/Button';
import Header from '../src/components/Header';
import { useAuth } from '../AuthContext'; // Import useAuth hook

export default function StartPage({ navigation }) {
  const { setBudgetAmount } = useAuth(); // Use setBudgetAmount from useAuth to set budget
  const [inputBudget, setInputBudget] = useState('');

  const postBudget = async () => {
    if (inputBudget > 0) {
      try {
        // Store budget in context
        setBudgetAmount(parseFloat(inputBudget));
        navigation.navigate('Home'); // Pass input budget as a route parameter
      } catch (error) {
        console.error('Error posting budget:', error);
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } else if (inputBudget === '') {
      Alert.alert('Validation', 'Please add your goal');
    } else {
      Alert.alert('Validation', 'Please check your goal again');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header headerName="PennyPinch" />
      <MoneyInput
        mainCopy="What's the most you want to spend?"
        value={inputBudget}
        onChangeText={setInputBudget}
        placeholder="Set your goal"
        keyboardType="numeric"
      />
      <Button callBack={postBudget} btnCopy="Enter" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Other styles
});
