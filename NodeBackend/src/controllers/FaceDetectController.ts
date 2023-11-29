// src/controllers/faceController.ts

import { Request, Response } from 'express';
import { faceSearchService } from '../services/faceService';
import {
  FaceSearchApiSuccessRresponse,
  FaceSearchRequest,
  FaceSearchApiErrorResponse,
} from '../dto/face.dto';
import { CreateUserDTO } from '../dto/user.dto';
import { enrollUserService } from '../services/userService';

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
 *     summary: Enroll a user with face images
 *     tags: [Face Detection]
 *     requestBody:
 *       description: User information and face images
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/CreateUserDTO'
 *     responses:
 *       200:
 *         description: User enrolled successfully
 *         content:
 *           application/json:
 *             example:
 *               result: "User enrolled successfully"
 */
export const faceEnroll = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userData: CreateUserDTO = req.body;
    const enrollResult = await enrollUserService(userData);
    // Validate request body here if needed
    res.json(enrollResult);
  } catch (error) {
    console.error('Error in face search controller:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
