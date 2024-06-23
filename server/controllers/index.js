const { Transaction } = require('../model/model');

const getTransaction = async (req, res) => {
  const userId = req.user.id; // Assuming userId is available in req.user after authentication

  try {
    const transactions = await Transaction.findAll({ where: { userId } });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const postTransaction = async (req, res) => {
  const userId = req.user.id; // Assuming userId is available in req.user after authentication
  const { account_balance, amount, description } = req.body;

  try {
    const transaction = await Transaction.create({
      userId,
      account_balance,
      amount,
      description,
    });

    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTransaction = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    // Check if the transaction exists for the given user
    const transaction = await Transaction.findOne({ where: { id, userId } });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // If transaction exists, delete it
    await Transaction.destroy({ where: { id, userId } });

    // Respond with success message
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const putRequest = async (req, res) => {
  const userId = req.user.id; // Assuming userId is available in req.user after authentication
  const { account_balance, amount, description } = req.body;

  try {
    const transaction = await Transaction.findOne({ where: { userId } });

    if (transaction) {
      transaction.account_balance = account_balance || transaction.account_balance;
      transaction.amount = amount || transaction.amount;
      transaction.description = description || transaction.description;

      await transaction.save();
      res.status(200).json({ message: 'Transaction updated successfully', transaction });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getTransaction,
  postTransaction,
  deleteTransaction,
  putRequest,
};
