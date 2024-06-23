// TransactionContext.js

import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';

const TransactionContext = createContext();

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [remainingBalance, setRemainingBalance] = useState(0);

  const deleteTransaction = async (id, token,navigation) => {
    try {
      console.log(`Attempting to delete transaction with id: ${id}`);

      const response = await fetch(`http://localhost:3001/api/transaction/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Transaction deleted successfully');
        setTransactions((prevTransactions) => prevTransactions.filter((t) => t.id !== id));
        const deletedTransaction = transactions.find((t) => t.id === id);
        if (deletedTransaction) {
          setRemainingBalance((prevBalance) => prevBalance - deletedTransaction.amount);
          navigation.setParams({
            remainingBalance: remainingBalance - deletedTransaction.amount,
          });
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to delete transaction:', errorData);
        throw new Error(errorData.message || 'Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      Alert.alert('Error', 'Failed to delete transaction');
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, remainingBalance, setRemainingBalance, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
