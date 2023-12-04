import { User } from '../entities/User';

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *         email:
 *           type: string
 */
export interface UserResponseDTO {
  id?: number;
  name?: string;
  email?: string;
}

/**
 * @swagger
 * definitions:
 *   CreateUserDTO:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       dob:
 *         type: string
 *         format: date
 *       email:
 *         type: string
 *       images:
 *         type: array
 *         items:
 *           type: string
 *       indexIds:
 *         type: array
 *         items:
 *           type: string
 *     required:
 *       - name
 *       - phoneNumber
 *       - dob
 *       - email
 *       - images
 *       - indexIds
 */

export interface CreateUserDTO {
  name: string;
  phoneNumber: string;
  dob: string; // Assuming date format, you can adjust it based on your needs
  email: string;
  images: string[];
  indexIds: string[];
}

export interface UserResponseDTO {
  user: User;
  images: string[];
}
