import express from 'express'

import authRouter from './routes/auth.route.js';
import medicationRouter from './routes/medication.route.js';
import userRouter from './routes/user.route.js'
import entryRouter from './routes/entry.route.js'

import dotenv from 'dotenv'

import connectDB  from './lib/db.js'
import { handleError } from './middleware/error.js';

import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
// app.use(handleError);
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

// routes
app.use('/api/auth', authRouter);
app.use('/api/medication', medicationRouter);
app.use('/api/user', userRouter);
app.use('/api/entry', entryRouter)

app.listen(PORT, () => {
  console.log("Began server on port ", PORT);
  connectDB();
});