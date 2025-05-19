const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connection');

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: 'Error fetching contacts', error: err.message });
  }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const db = getDb();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.status(200).json(contact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({ message: 'Error fetching contact', error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById
};
