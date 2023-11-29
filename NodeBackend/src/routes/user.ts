// src/routes/user.ts

import { Router } from 'express';
import {
  getUsers,
  createUser,
  AddTwoNum,
  getUserByIndexId,
} from '../controllers/UserController';

export const userRouter = Router();

userRouter.get('/byIndexId/:indexId', getUserByIndexId);

userRouter.post('/v1/createUser', createUser);

userRouter.get('/addetwonum', AddTwoNum);
