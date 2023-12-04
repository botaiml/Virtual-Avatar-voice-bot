import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import {
  FaceSearchApiRequest,
  FaceSearchApiSuccessRresponse,
  FaceSearchRequest,
  FaceSearchApiErrorResponse,
  FaceEnrollApiDTO,
  FaceEnrollApiRequest,
  FaceEnrollErrorResponseDTO,
  FaceEnrollSuccessResponseDTO,
} from '../dto/face.dto';
dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL || 'http://0.0.0.0:8015/facerec';
const FACE_SEARCH_ENDPOINT = '/face-search';
const FACE_ENROLL_EWNDPOINT = '/face-enroll';

export const faceSearchService = async (
  searchRequest: FaceSearchRequest,
): Promise<FaceSearchApiErrorResponse | FaceSearchApiSuccessRresponse> => {
  const request: FaceSearchApiRequest = {
    file: searchRequest.base64,
    id: 1,
    edit: true,
  };
  try {
    const response: AxiosResponse<
      FaceSearchApiErrorResponse | FaceSearchApiSuccessRresponse
    > = await axios.post(`${API_BASE_URL}${FACE_SEARCH_ENDPOINT}`, request, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error in face search service:', error);
    throw error;
  }
};

export const faceEnrollService = async (
  enrollRequest: FaceSearchRequest,
): Promise<FaceEnrollSuccessResponseDTO | FaceEnrollErrorResponseDTO> => {
  const request: FaceEnrollApiRequest = [
    {
      file: enrollRequest.base64,
      id: 1,
      edit: true,
    },
  ];
  try {
    const response: AxiosResponse<
      FaceEnrollSuccessResponseDTO | FaceEnrollErrorResponseDTO
    > = await axios.post(
      `${API_BASE_URL}${FACE_ENROLL_EWNDPOINT}`,
      request,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error in face search service:', error);
    throw error;
  }
};
