import { StyleSheet } from 'react-native';

const font = StyleSheet.create({
  primary: { fontSize: 12, color: '#60708F', fontWeight: '700' },

  lighterPrimary: { fontSize: 13, color: '#60708F', fontWeight: '700' },

  date: {
    fontSize: 12,
    color: '#BBBFC9',
    fontWeight: '700',
    // placeholderTextColor: '#8B98B1',
  },
  searchBarPlaceholder: {
    fontSize: 16,
    color: '#BBBFC9',
    fontWeight: 'normal',
  },

  cardFont: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  bigWhite: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  midWhite: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

const transList = StyleSheet.create({ descriptionBox: {} });

export { font, transList };
