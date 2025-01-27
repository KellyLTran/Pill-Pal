import request from 'supertest';
import app from '../server.js'; // Import your Express app
import User from '../models/user.model.js';
import Entry from '../models/entry.model.js';
import mongoose from 'mongoose';

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});


describe('User Routes', () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Clear the database and close the connection
    await User.deleteMany({});
    await Entry.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/user/:userID', () => {
    it('should return a user', async () => {
      // Create a test user
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      const res = await request(app).get(`/api/user/${user._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('get user route hit');
    });
  });

  describe('GET /api/user/:userID/history', () => {
    it('should return the user\'s entry history', async () => {
      // Create a test user and entry
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      const entry = await Entry.create({
        usedAt: new Date(),
        medication: new mongoose.Types.ObjectId(),
      });

      user.entryHistory.push(entry._id);
      await user.save();

      const res = await request(app).get(`/api/user/${user._id}/history`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.allEntries.length).toBeGreaterThan(0);
    });
  });
});