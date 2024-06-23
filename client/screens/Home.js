import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useAuth } from '../AuthContext';
import Header from '../src/components/Header';
import HomeMain from '../src/components/home/HomeMain';
import TransList from '../src/components/TransItem';
import { IconButton, IconBtnOnly } from '../src/components/Icon';
import { font } from '../src/components/GlobalStyles';

export default function Home({ navigation }) {
  const { token, logout, budget } = useAuth();
  const [initialLoading, setInitialLoading] = useState([]);
  const [initialBalance, setInitialBalance] = useState({ account_balance: 0 });
  const [remainBalance, setRemainBalance] = useState(0);
  const [sum, setSum] = useState(0);
  const todayBudget = budget;

const fetchData = async () => {
  try {
    const res = await fetch(`http://localhost:3001/api/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    const sortedData = sortDate(data);
    setInitialLoading(sortedData);
    setInitialBalance(sortedData[0] || { account_balance: 0 });
    if (sortedData.slice(1).length >= 1) {
      const amountArray = sortedData.slice(1).map(i => i.amount);
      setSum(amountArray.reduce((prev, curr) => prev + curr, 0));
    } else {
      setSum(0);
    }
  } catch (err) {
    console.log(err);
    Alert.alert('Error', 'Failed to fetch data. Please try again later.');
  }
};

const sortDate = (data) => {
  return data.sort((a, b) => {
    if (b.created && a.created) {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    }
    return 0;
  });
};


  useEffect(() => {
    let isMounted = true;

    if (!token) {
      navigation.navigate('Login');
    } else {
      fetchData();

      const unsubscribe = navigation.addListener('focus', () => {
        fetchData();
      });

      return () => {
        isMounted = false;
        unsubscribe();
      };
    }
  }, [navigation, token]);

  useEffect(() => {
    setRemainBalance((initialBalance.account_balance || 0) + sum);
  }, [initialBalance, sum]);

  function goToDetailsScreen() {
    navigation.navigate('TransDetails', {
      initialLoading: initialLoading,
      remainingBalance: (initialBalance.account_balance || 0) + sum,
    });
  }

  function goToSettingScreen() {
    navigation.navigate('Setting', {
      initialBalance: initialBalance,
    });
  }

  const renderItem = ({ item }) => {
    if (item.amount) {
      return (
        <TransList
          created={item.created}
          amount={item.amount}
          description={item.description}
          id={item.id}
          deleteItem={() => deleteItem(item)}
        />
      );
    }
    return null;
  };

  const deleteItem = (targetItem) => {
    const deleteRequest = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: targetItem.id,
      }),
    };
    return Alert.alert(
      'Confirmation',
      'Do you want to remove this transaction?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await fetch(`http://localhost:3001/transaction/${targetItem.id}`, deleteRequest);
              setInitialLoading((prev) => prev.filter((i) => i.id !== targetItem.id));
              setSum((prevSum) => prevSum - targetItem.amount);
              fetchData();
            } catch (error) {
              console.error(error);
            }
          },
        },
        {
          text: 'No',
        },
      ]
    );
  };

  const keyExtractor = (item) => {
    return item?.id ? item.id.toString() : Math.random().toString();
  };

  function handleLogout() {
    logout();
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            zIndex: 1,
            position: 'absolute',
            left: 20,
            padding: 14,
            bottom: 20,
          }}
          onPress={goToSettingScreen}
        >
          <IconButton name="setting" />
        </TouchableOpacity>

        <Header
          pageName="Home"
          icon="setting"
          navigateTo="Setting"
          navigation={navigation}
          initialBalance={initialBalance}
          iconDisplay={false}
        />
      </View>

      <Text style={styles.budgetADay}>Today's Budget: ${todayBudget || 0}</Text>

      <HomeMain
        key={1}
        initialBalance={initialBalance.account_balance || 0}
        sum={sum}
        remainingBalance={remainBalance}
      />

      <View style={styles.budgetBtnBox}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddSpend');
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <IconButton style={{ paddingLeft: 10 }} name="tago" />
            <Text style={[font.primary, { paddingTop: 10 }]}>Add Spend</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddMoney');
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <IconButton name="plussquare" />
            <Text style={[font.primary, { paddingTop: 10 }]}>Add Money</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.activities_bar}>
        <Text style={styles.idealSpend}>Recent Activities</Text>
        <TouchableOpacity onPress={goToDetailsScreen}>
          <Text>
            <IconBtnOnly name="bars" />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={initialLoading}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          extraData={initialLoading}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  budgetADay: {
    alignItems: 'center',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  budgetBtnBox: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  activities_bar: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  idealSpend: {
    fontSize: 16,
    color: '#60708F',
    fontWeight: 'bold',
  },
  listContainer: {
    maxHeight: 270,
    marginVertical: 10,
  },
  logoutButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
  },
});
