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
  // first to hit api and on success save the data to db
  const enrollRequest: FaceEnrollApiRequest = userRequest.images.map(
    (image, index) => ({ edit: true, id: index, file: image }),
  );

  try {
    const faceEnrollReponse: any = await faceEnrollService(enrollRequest);
    //   save the face to db
    // CHANGE IN FACE ENROLL RESPONSE REQUIRED - as it returns array of object where success in present in all the array, hard to handle in savin to the db
    //   for this instance checking the success flag for 3 element out of 5
    const indexIds = [];
    const faceImages = [];
    for (let i = 0; i < faceEnrollReponse.length; i++) {
      const eachRes = faceEnrollReponse[i];
      if (eachRes.success) {
        indexIds.push(eachRes.indexid);
        faceImages.push(userRequest.images[i]);
      }
    }

    if (indexIds.length > 0) {
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
        indexId: indexIds,
        images: faceImages,
      });

      await mongoUser.save();

      return { success: true, message: 'Enrollment success' };
    }
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
    const userMongoData = await UserMongoModel.findOne({ indexId: indexId });

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
