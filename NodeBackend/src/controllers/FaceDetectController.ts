// src/controllers/faceController.ts

import { Request, Response } from 'express';
import { faceEnrollService, faceSearchService } from '../services/faceService';
import {
  FaceSearchApiSuccessRresponse,
  FaceSearchRequest,
  FaceSearchApiErrorResponse,
  FaceEnrollSuccessResponseDTO,
  FaceEnrollErrorResponseDTO,
} from '../dto/face.dto';
import { CreateUserDTO } from '../dto/user.dto';
// import { enrollUserService } from '../services/userService';

/**
 * @swagger
 * /face/search:
 *   post:
 *     summary: Perform a face search
 *     tags: [Face Detection]
 *     requestBody:
 *       description: The face search request
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FaceSearchRequest'
 *     responses:
 *       200:
 *         description: Successful response with face search results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FaceSearchApiSuccessRresponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Internal Server Error
 */
export const faceSearch = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const searchRequest: FaceSearchRequest = req.body;
    const searchResult:
      | FaceSearchApiErrorResponse
      | FaceSearchApiSuccessRresponse = await faceSearchService(searchRequest);
    res.json(searchResult);
  } catch (error) {
    console.error('Error in face search controller:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

/**
 * @swagger
 * /face/enroll:
 *   post:
 *     summary: Perform a face enroll
 *     tags: [Face Detection]
 *     requestBody:
 *       description: The face enroll request
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FaceSearchRequest'
 *     responses:
 *       200:
 *         description: Successful response with face enroll results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FaceEnrollSuccessResponseDTO'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Internal Server Error
 */
export const faceEnroll = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const enrollRequest: FaceSearchRequest = req.body;
    const enrollResult:
      | FaceEnrollSuccessResponseDTO
      | FaceEnrollErrorResponseDTO = await faceEnrollService(enrollRequest);
    res.json(enrollResult);
  } catch (error) {
    console.error('Error in face search controller:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
