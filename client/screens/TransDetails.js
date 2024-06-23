import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, Alert } from 'react-native';
import SearchBar from '../src/components/SearchBar';
import TransList from '../src/components/TransItem';
import DivideLine from '../src/components/divideLine';
import Header from '../src/components/Header';
import { font } from '../src/components/GlobalStyles';
import { useAuth } from '../AuthContext'; // Adjust the path as needed
import { useTransaction } from '../TransactionContext'; // Adjust the import path as needed

export default function TransDetails({ route, navigation }) {
  const { initialLoading } = route.params;
  const { token } = useAuth(); // Get the token from the auth context
  const { transactions, setTransactions, remainingBalance, deleteTransaction } = useTransaction();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTransactions(initialLoading);
  }, [initialLoading, setTransactions]);

  const renderItem = ({ item }) => {
    if (item.amount) {
      return (
        <TransList
          created={item.created}
          amount={item.amount}
          description={item.description}
          id={item.id} // Assuming id is the unique identifier for transactions
        />
      );
    }
  };

  const searchResult = transactions.filter((item) => {
    if (searchTerm === '') {
      return true; // Return all items if searchTerm is empty
    } else if (
      item.description &&
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true; // Return items that match the search term
    }
    return false;
  });

  const keyExtractor = (item, index) => {
    return item.id ? item.id.toString() : index.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        pageName={'Details'}
        icon={'home'}
        navigateTo={'Home'}
        iconDisplay={true}
      />

      {/* Remaining balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Remaining Balance</Text>
        <Text style={styles.balanceAmount}>{`£ ${remainingBalance}`}</Text>
      </View>

      {/* Divider */}
      <DivideLine />

      {/* Search bar */}
      <SearchBar onChangeText={setSearchTerm} value={searchTerm} />

      {/* Transaction list */}
      <FlatList
        data={searchResult}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={transactions}
        style={styles.flatList}
      />

      {/* Divider */}
      <DivideLine />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  flatList: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});
