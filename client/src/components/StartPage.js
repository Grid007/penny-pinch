import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function StartPage({ navigation }) {
  const [inputBudget, setInputBudget] = useState('');

  // Function to handle text input change
  const handleInputChange = (text) => {
    setInputBudget(text);
  };

  // Function to save the budget
  const saveBudget = async () => {
    const parsedBudget = parseFloat(inputBudget);
    if (isNaN(parsedBudget) || parsedBudget < 0) {
      Alert.alert('Budget Error', 'Budget must be a positive number');
    } else {
      try {
        // Call the function to post the initial budget to the server
        await postInitialBudget(parsedBudget);
        // Navigate to the Home screen upon successful budget entry
        navigation.navigate('Home');
      } catch (error) {
        console.error('Error saving budget:', error.message);
        Alert.alert('Error', 'Failed to save budget. Please try again.');
      }
    }
  };

  // Function to post initial budget to the server
  const postInitialBudget = async (budget) => {
    try {
      const response = await fetch('http://localhost:3001/api/transaction', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account_balance: budget,
          amount: 0, // Assuming you might want to initialize other properties
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to post initial budget');
      }
      // Handle success response as needed
    } catch (error) {
      throw new Error('Error posting initial budget:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.budget_copy}>Budget</Text>
        <Text>What's the most you want to spend?</Text>
      </View>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={inputBudget}
          onChangeText={handleInputChange}
          placeholder="Set your goal"
        />
        <View style={styles.lineStyle} />
      </View>
      <View style={styles.btn_container}>
        <TouchableOpacity
          style={styles.button}
          onPress={saveBudget}
          underlayColor="#fff"
        >
          <Text style={styles.enter}>Enter</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    margin: 20,
  },
  budget_copy: {
    textAlign: 'center',
    marginBottom: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container: {
    padding: 20,
  },
  input: {
    height: 40,
    width: 280,
    padding: 10,
    borderWidth: 0.6,
    borderColor: 'black',
  },
  button: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#8438FF',
    borderRadius: 25,
  },
  btn_container: {
    alignItems: 'center',
  },
  enter: {
    color: 'white',
  },
  lineStyle: {
    marginTop: 5,
    borderWidth: 0.6,
    opacity: 0.3,
    borderColor: 'black',
    margin: 10,
  },
});
