import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Medication from '../models/medication.model.js';
import Entry from '../models/entry.model.js';
import dotenv from 'dotenv';

dotenv.config();

import {entries} from './sample/entries-sample.js'
import {users} from './sample/users-sample.js'
import {medications} from './sample/medications-sample.js'

const MONGODB_URI = process.env.MONGODB_URI;


async function seedDatabase() {
  try {
    // Clear existing data (optional)
    await User.deleteMany({});
    await Medication.deleteMany({});
    await Entry.deleteMany({});
    console.log('Existing data cleared');

    // Create medications
    const createdMedications = await Medication.insertMany(medications);
    console.log('Medications seeded:', createdMedications);

    // Create users
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded:', createdUsers);

    // Create entries and associate them with users and medications
    entries[0].medication = createdMedications[0]._id;
    entries[1].medication = createdMedications[1]._id;

    const createdEntries = await Entry.insertMany(entries);
    console.log('Entries seeded:', createdEntries);

    // Associate entries with users
    createdUsers[0].entryHistory.push(createdEntries[0]._id);
    createdUsers[1].entryHistory.push(createdEntries[1]._id);

    await createdUsers[0].save();
    await createdUsers[1].save();
    console.log('Entries associated with users');

    // Close the connection
    mongoose.connection.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  seedDatabase();
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
