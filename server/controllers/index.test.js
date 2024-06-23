const { putRequest } = require('../controllers/index');
const Transaction = require('../model/model');

describe('putRequest', () => {
  it('should update a transaction by ID', async () => {
    // Create a mock request object
    const req = {
      body: {
        id: 1,
        account_balance: 1000,
      },
    };

    // Create a mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the Transaction.update method
    Transaction.update = jest.fn().mockResolvedValue([1]);

    // Call the putRequest function
    await putRequest(req, res);

    // Check if the response status and message are correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('It has been updated');

    // Check if the Transaction.update method was called with the correct arguments
    expect(Transaction.update).toHaveBeenCalledWith(
      { account_balance: 1000 },
      { where: { id: 1 } }
    );
  });

  it('should handle missing id in request body', async () => {
    // Create a mock request object
    const req = {
      body: {
        account_balance: 1000,
      },
    };

    // Create a mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Call the putRequest function
    await putRequest(req, res);

    // Check if the response status and message are correct
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Missing id in request body');
  });

  it('should handle transaction not found', async () => {
    // Create a mock request object
    const req = {
      body: {
        id: 1,
        account_balance: 1000,
      },
    };

    // Create a mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the Transaction.update method
    Transaction.update = jest.fn().mockResolvedValue([0]);

    // Call the putRequest function
    await putRequest(req, res);

    // Check if the response status and message are correct
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Transaction not found');

    // Check if the Transaction.update method was called with the correct arguments
    expect(Transaction.update).toHaveBeenCalledWith(
      { account_balance: 1000 },
      { where: { id: 1 } }
    );
  });

  it('should handle server error', async () => {
    // Create a mock request object
    const req = {
      body: {
        id: 1,
        account_balance: 1000,
      },
    };

    // Create a mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the Transaction.update method to throw an error
    Transaction.update = jest.fn().mockRejectedValue(new Error('Server error'));

    // Call the putRequest function
    await putRequest(req, res);

    // Check if the response status and error message are correct
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(new Error('Server error'));

    // Check if the Transaction.update method was called with the correct arguments
    expect(Transaction.update).toHaveBeenCalledWith(
      { account_balance: 1000 },
      { where: { id: 1 } }
    );
  });
});