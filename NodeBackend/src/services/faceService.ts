import axios, { AxiosResponse } from 'axios';
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

const API_BASE_URL = 'https://demo.botaiml.com/facerec';
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
  enrollRequest: FaceEnrollApiRequest,
): Promise<FaceEnrollSuccessResponseDTO | FaceEnrollErrorResponseDTO> => {
  try {
    const response: AxiosResponse<
      FaceEnrollSuccessResponseDTO | FaceEnrollErrorResponseDTO
    > = await axios.post(
      `${API_BASE_URL}${FACE_ENROLL_EWNDPOINT}`,
      enrollRequest,
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
