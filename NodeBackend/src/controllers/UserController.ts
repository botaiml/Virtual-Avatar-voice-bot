import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { CreateUserDTO, UserResponseDTO } from '../dto/user.dto';
import { enrollUserService, userByIndexId } from '../services/userService';
import NotFoundError from '../errors/NotFoundError';
import InternalServerError from '../errors/InternalServerError';

/**
 * @swagger
 * /user/byIndexId/{indexId}:
 *   get:
 *     summary: Get user by indexId
 *     tags: [User ]
 *     description: Retrieve user information based on indexId.
 *     parameters:
 *       - in: path
 *         name: indexId
 *         required: true
 *         description: The indexId of the user.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EachUserDTO'
 */
export const getUserByIndexId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { indexId } = req.params;
    const user = await userByIndexId(indexId);
    res.json(user);
  } catch (error) {
    console.error('Error in getUserByIndexId:', error);

    if (error instanceof NotFoundError) {
      res.status(404).json({ success: false, error: error.message });
    } else if (error instanceof InternalServerError) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'Unexpected Error' });
    }
  }
};

/**
 * @swagger
 * /user/enroll:
 *   post:
 *     summary: Enroll a user with face images
 *     tags: [User ]
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
export const userEnroll = async (
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

// export const getUsers = async (req: Request, res: Response): Promise<void> => {
//   const userRepository = getRepository(User);
//   const users = await userRepository.find();
//   const userResponseDTOs: UserResponseDTO[] = users.map((user) => ({
//     id: user.id,
//     name: user.name,
//     email: user.email,
//   }));
//   res.json(userResponseDTOs);
// };

// export const createUser = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   const userRepository = getRepository(User);
//   const createUserDTO: CreateUserDTO = req.body;
//   const newUser = userRepository.create(createUserDTO);
//   await userRepository.save(newUser);

//   const userResponseDTO: UserResponseDTO = {
//     id: newUser.id,
//     name: newUser.name,
//     email: newUser.email,
//   };
//   res.json(userResponseDTO);
// };
