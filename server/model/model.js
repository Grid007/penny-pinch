const { Sequelize, DataTypes } = require('sequelize');

// Set up the PostgreSQL connection
const sequelize = new Sequelize('finance-tracker', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, // Default PostgreSQL port
  logging: false, // Disable logging; default: console.log
});

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: false
});

// Define the Transaction model
const Transaction = sequelize.define('Transaction', {
  account_balance: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  spending: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  addMoney: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // References the User model
      key: 'id'
    }
  },
}, {
  tableName: 'transactions',
  timestamps: false,
});

// Define associations
User.hasMany(Transaction, { foreignKey: 'userId' }); // One-to-many relationship: User can have many transactions
Transaction.belongsTo(User, { foreignKey: 'userId' }); // Transaction belongs to a single user

// Connect to the database and create the tables if they don't exist
async function syncDatabase() {
  try {
    // Sync all defined models to the database
    await sequelize.sync();
    console.log('Database & tables synced!');
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
}

// Call the syncDatabase function to initiate synchronization
syncDatabase();

module.exports = { Transaction, User, sequelize };
