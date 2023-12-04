import {
  FaceEnrollApiRequest,
  FaceEnrollErrorResponseDTO,
  FaceEnrollSuccessResponseDTO,
} from '../dto/face.dto';
import { CreateUserDTO, UserResponseDTO } from '../dto/user.dto';
import { faceEnrollService } from './faceService';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
import { UserMongoDocument, UserMongoModel } from '../models/UserMongo';
import NotFoundError from '../errors/NotFoundError';
import InternalServerError from '../errors/InternalServerError';

export const enrollUserService = async (
  userRequest: CreateUserDTO,
): Promise<any> => {
  const userRepository = getRepository(User);
  try {
    // Save data to PostgreSQL database
    const createUser: User = {
      name: userRequest.name,
      email: userRequest.email,
      DOB: userRequest.dob,
      phoneNumber: userRequest.phoneNumber,
    };
    const newUser = userRepository.create(createUser);
    const user = await userRepository.save(newUser);
    const mongoUser = new UserMongoModel({
      userId: user.id,
      indexIds: userRequest.indexIds,
      images: userRequest.images,
    });

    await mongoUser.save();

    return { success: true, message: 'Enrollment success' };
  } catch (error: any) {
    console.log(error?.message);
    return { success: false, message: 'enrollment failure' };
  }
};

export const userByIndexId = async (
  indexId: string,
): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  try {
    const userMongoData = await UserMongoModel.findOne({ indexIds: indexId });

    if (!userMongoData) {
      throw new NotFoundError('User not found');
    }

    const user = await userRepository.findOne({ id: userMongoData?.userId });

    if (!user) {
      throw new NotFoundError('User data not found in the main database');
    }

    const res: UserResponseDTO = { user: user, images: userMongoData.images };
    return res;
  } catch (error) {
    console.error('Error in userByIndexId:', error);
    throw error;
  }
};
