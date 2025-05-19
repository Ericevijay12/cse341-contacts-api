// db/connection.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;

const initDb = async (callback) => {
  if (_db) {
    console.log('Database already initialized');
    return callback(null, _db);
  }
  
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    _db = client.db();
    console.log('Connected to MongoDB');
    callback(null, _db);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    callback(err);
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized. Call initDb first.');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
