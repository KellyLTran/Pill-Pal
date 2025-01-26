import express from 'express'

import {login, signup} from '../controllers/auth.controller.js'

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);

// TODO: add middleware for check? add jwt tokens

export default authRouter;

