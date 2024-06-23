import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';
import * as Font from 'expo-font';

export default function TransList(props) {
  const d = moment();
  const today = d.get('date');
  const daysInMonth = d.daysInMonth();
  const remainingDays = daysInMonth - today;
  const remainingBalance = props.initialBalance + props.sum;
  const budgetADay = Math.round(remainingBalance / remainingDays);

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.cardContainer}>
        <View style={styles.balanceContainer}>
          <Text style={[styles.cardFont]}>Balance</Text>
        </View>
        <View style={styles.remainingBalContain}>
          <Text
            style={[styles.cardFont, styles.remainingBalance]}
          >{`£ ${remainingBalance}`}</Text>
        </View>
        <View style={styles.remainingDaysContain}>
          <Text style={[styles.cardFont]}>
            {remainingDays > 1
              ? `${remainingDays} days to go`
              : `${remainingDays} day to go`}
          </Text>
        </View>
      </View>

      <View style={styles.budgetADayContainer}>
        <Text style={[styles.idealSpend]}>Ideal budget for a day </Text>
        <Text style={[styles.idealSpend]}>{`£ ${budgetADay}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    backgroundColor: '#8438FF',
    width: 250,
    height: 150,
    borderRadius: 10,
    marginBottom: 30,
    padding: 30,
    shadowColor: '#9F8EBC',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.7,
    shadowRadius: 20,

    elevation: 2,
  },
  remainingBalContain: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  remainingBalance: {
    fontSize: 34,
  },
  remainingDaysContain: {
    alignItems: 'flex-end',
  },
  cardFont: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  budgetADayContainer: {
    alignItems: 'center',
  },
  idealSpend: {
    fontSize: 12,
    color: '#60708F',
    fontWeight: '700',
  },
});
