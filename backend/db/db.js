const mongoose = require('mongoose');
require("dotenv").config();

const mongodbUri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongodbUri, options);
    console.log('Connected to the database!');
  } catch (err) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1); // Quit the application if it fails to connect to the database
  }
}

module.exports = connectToDatabase;