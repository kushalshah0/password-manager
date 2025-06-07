const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const passRoute = require('./routes/passRoute');

app.use(cors());
app.use(express.json());

app.use('/api/user',userRoute);
app.use('/api/pass',passRoute);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});