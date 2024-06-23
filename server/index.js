// index.js

const express = require('express');
const cors = require('cors');
const router = require('./router');
const { sequelize } = require('./model/model'); // Adjust the path if necessary

const app = express();
const PORT = 3001;

app //
  .use(cors())
  .use(express.json())
  .use('/api', router); // Base path for all routes

  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
