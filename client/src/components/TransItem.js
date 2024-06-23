import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { IconBtnOnly } from './Icon';
import { font } from './GlobalStyles';
import { useTransaction } from '../../TransactionContext'; // Adjust the import path as needed
import { useAuth } from '../../AuthContext'; // Adjust the import path as needed
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 from react-native-vector-icons

export default function TransList({ created, amount, description, id }) {
  const { deleteTransaction } = useTransaction();
  const { token } = useAuth(); // Get the token from the auth context
  const [isFavorite, setIsFavorite] = useState(false);

  const formatDate = (original) => {
    const date = moment(original).format('D.M.YYYY');
    return date;
  };

  const handleDelete = () => {
    deleteTransaction(id, token);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.activities_item}>
      <TouchableOpacity onPress={handleDelete}>
        <View style={styles.icon}>
          <IconBtnOnly name={'isv'} />
        </View>
      </TouchableOpacity>

      <View style={styles.transList}>
        <Text style={[font.primary, { marginBottom: 3 }]}>
          {description}
        </Text>
        {/* Toggle favorite button */}
        <TouchableOpacity onPress={toggleFavorite}>
          <FontAwesome5
            name={isFavorite ? 'star' : 'star-o'}
            size={24}
            color={isFavorite ? '#FFD700' : '#ccc'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.amount}>
        <Text style={[font.primary, { textAlign: 'center' }]}>
          £ {amount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activities_item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    width: '100%',
    marginBottom: 1,
  },
  transList: {
    flex: 4,
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '50%',
    paddingLeft: 20,
  },
  icon: {
    alignContent: 'flex-end',
    padding: 18,
    borderRadius: 14,
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    marginLeft: -10,
  },
  amount: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  },
});
