import request from 'supertest';
import app from '../server.js'; // Import your Express app
import Medication from '../models/medication.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

describe('Concentration graph routes', () => {
  let user;
  let medication;

  beforeAll(async () => {
    // Connect to the test database
    try {
      await mongoose.connect(process.env.MONGODB_URI_TEST);
    } catch (error) {
      console.log ("AHHH", error)
    }

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

    // Simulate adding a medication entry for the user
    await request(app).post(`/api/entry/${user._id}/${medication._id}`);
  });

  afterAll(async () => {
    // Clean up the database
    await User.deleteMany({});
    await Medication.deleteMany({});
    await mongoose.connection.close();
  }, 30000); // Increase timeout to 30 seconds

  describe('GET /api/user/:userid/graph', () => {
    it('Should return a proper mapping based on the correct time as well as the sleep time', async () => {
      // Mock the current time for consistent testing
      const currentTime = new Date();

      // Get the user's concentration graph over a certain period
      const response = await request(app)
        .get(`/api/user/${user._id}/graph`)
        .query({
          start: currentTime.toISOString(),
          end: new Date(currentTime.getTime() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours later
        });

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('graph');
      expect(response.body.graph).toBeInstanceOf(Array);
      expect(response.body).toHaveProperty('sleepTime');
      expect(new Date(response.body.sleepTime)).toBeInstanceOf(Date);

      // Validate the graph data
      const concentrationMap = medication.concentration_map;
      expect(response.body.graph).toHaveLength(Object.keys(concentrationMap).length);

      response.body.graph.forEach((entry, index) => {
        const [timestamp, value] = entry;

        // Check if the timestamp is a valid date
        expect(new Date(timestamp)).toBeInstanceOf(Date);

        // Check if the value matches the concentration map
        const expectedValue = Object.values(concentrationMap)[index];
        expect(value).toBe(expectedValue);
      });
    });
  });

  describe('GET /api/user/:userid/sleep', () => {
    it('Return datetime of when the user can sleep (based on entry of using a medication)', async () => {
      const response = await request(app).get(`/api/user/${user._id}/sleep`);

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('sleepTime');
      expect(new Date(response.body.sleepTime)).toBeInstanceOf(Date);

      // Verify the sleep time is calculated correctly
      const sleepTime = new Date(response.body.sleepTime);
      const expectedSleepTime = new Date(new Date().getTime() + medication.sleep_m * 60 * 1000); // sleep_m is in minutes
      expect(sleepTime.getTime()).toBeCloseTo(expectedSleepTime.getTime(), -2); // Allow for minor time differences
    });
  });
});