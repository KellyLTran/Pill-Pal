import request from 'supertest';
import app from '../server.js'; // Import your Express app
import User from '../models/user.model.js';
import mongoose from 'mongoose';

describe('Auth Routes', () => {
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
    await mongoose.connection.close();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toEqual('test@example.com');
    });

    it('should return 400 for invalid signup parameters', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          name: '', // Invalid name
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Invalid signup parameters.');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in an existing user', async () => {
      // Create a user first
      await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toEqual('test@example.com');
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual('User not found.');
    });

    it('should return 401 for incorrect password', async () => {
      // Create a user first
      await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual('Invalid credentials');
    });
  });
});