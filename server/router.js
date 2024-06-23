// router.js

const express = require('express');
const { register, signIn } = require('./controllers/authController');
const { 
  getTransaction, 
  postTransaction, 
  deleteTransaction, 
  putRequest, 
  securedGetTransaction, 
  securedPostTransaction, 
  securedDeleteTransaction, 
  securedPutRequest 
} = require('./controllers/index');
const { verifyToken } = require('./middleware/authMiddleware');

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', signIn);

// Transaction routes
router.get('/transaction', verifyToken, getTransaction);
router.post('/transaction', verifyToken, postTransaction);
router.delete('/transaction/:id', verifyToken, deleteTransaction);
router.put('/transaction', verifyToken, putRequest);

module.exports = router;
