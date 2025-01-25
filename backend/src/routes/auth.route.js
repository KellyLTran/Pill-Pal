import express from 'express'

import {login, signup, logout} from '../controllers/auth.controller'

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

// TODO: add middleware for check? add jwt tokens

export default authRouter;

