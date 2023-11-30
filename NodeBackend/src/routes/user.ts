import { Router } from 'express';
import { getUserByIndexId } from '../controllers/UserController';

export const userRouter = Router();

userRouter.get('/byIndexId/:indexId', getUserByIndexId);
