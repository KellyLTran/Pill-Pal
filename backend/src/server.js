import express from 'express'
import authRouter from './routes/auth.route';
import medRouter from './routes/med.route';

import dotenv from 'dotenv'

import { connectDB } from './lib/db'
import { handleError } from './middleware/error';

import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(handleError);
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

// routes
app.use('/api/auth', authRouter);
app.use('/api/meds', medRouter)

app.listen(PORT, () => {
  console.log("Began server on port ", PORT);
  connectDB();
});