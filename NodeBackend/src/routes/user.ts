import { Router } from 'express';
import { getUserByIndexId, userEnroll } from '../controllers/UserController';

export const userRouter = Router();

userRouter.get('/byIndexId/:indexId', getUserByIndexId);
userRouter.post('/enroll', userEnroll);
