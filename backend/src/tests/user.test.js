import request from 'supertest';
import app from '../server.js'; // Import your Express app
import User from '../models/user.model.js';
import Medication from '../models/medication.model.js';

import Entry from '../models/entry.model.js';
import mongoose from 'mongoose';

describe('User Routes', () => {

  let user;
  let medication;

  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    await mongoose.connection.dropDatabase();

    // Create a test medication
    medication = await Medication.create({
      name: 'Medication B',
      dosage: 250,
      release: 'XR',
      sleep_m: 800,
      concentration_map: { 40: 0.5, 80: 1, 160: 0.5, 250: 0 }, // Use a plain object instead of a Map
    });

    // Create a test user
    user = await User.create({
      email: `test${Date.now()}@example.com`, // Ensure unique email
      name: 'test user',
      password: 'password',
    });

  });

  afterAll(async () => {
    // Clear the database and close the connection
    await User.deleteMany({});
    await Entry.deleteMany({});
    await Medication.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/user/:userID', () => {
    it('should return a user', async () => {
      
      const res = await request(app).get(`/api/user/${user._id}`);
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("POST api/user/:userID/:medicationID", () => {
    it("Should be able to create an entry from a user", async () => {
      const createEntryRes = await request(app)
        .post(`/api/user/${user._id}/${medication._id}`).send({usedAt: new Date()});
      
      console.log(createEntryRes.body)

      expect(createEntryRes.statusCode).toEqual(201);

      const resTwo = await request(app).get(`/api/user/${user._id}/history`);
      
      expect(resTwo.statusCode).toEqual(200);
      expect(resTwo.body.entryHistory.length).toBeGreaterThan(0);      
    })
  })

});