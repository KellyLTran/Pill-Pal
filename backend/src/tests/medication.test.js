import request from 'supertest';
import app from '../server.js'; // Import your Express app
import Medication from '../models/medication.model.js';
import mongoose from 'mongoose';

describe('Medication Routes', () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Clear the database and close the connection
    await Medication.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/medication', () => {
    it('should return all medications', async () => {
      // Create a test medication
      await Medication.create({
        name: 'Medication A',
        dosage: 500,
        release: 'IR',
        sleep_m: 6,
        concentration_map: new Map([['hour1', 10]]),
      });

      const res = await request(app).get('/api/medication');

      expect(res.statusCode).toEqual(200);
      expect(res.body.allMedications.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/medication/:medicationID', () => {
    it('should return a single medication', async () => {
      // Create a test medication
      const medication = await Medication.create({
        name: 'Medication B',
        dosage: 250,
        release: 'EX',
        sleep_m: 8,
        concentration_map: new Map([['hour1', 15]]),
      });

      const res = await request(app).get(`/api/medication/${medication._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual('Medication B');
    });

    it('should return 404 for invalid medication ID', async () => {
      const res = await request(app).get('/api/medication/invalidID');

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual('Invalid parameters!');
    });
  });
});