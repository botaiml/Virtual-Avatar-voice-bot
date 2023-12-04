import { Router } from 'express';
import { faceSearchService } from '../services/faceService';
import { faceEnroll, faceSearch } from '../controllers/FaceDetectController';

export const faceRouter = Router();

faceRouter.post('/search', faceSearch);
faceRouter.post('/enroll', faceEnroll);
