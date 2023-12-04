/**
 * @swagger
 * components:
 *   schemas:
 *     FaceSearchApiRequest:
 *       type: object
 *       required:
 *         - edit
 *         - id
 *         - file
 *       properties:
 *         edit:
 *           type: boolean
 *           description: Indicates whether the request is for editing.
 *         id:
 *           type: number
 *           description: The ID associated with the request.
 *         file:
 *           type: string
 *           description: The file string representing the image.
 */

export interface FaceSearchApiRequest {
  edit: boolean;
  id: number;
  file: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     FaceSearchApiErrorResponse:
 *       type: object
 *       required:
 *         - success
 *         - id
 *         - errorCode
 *         - error
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the face search was successful.
 *         id:
 *           type: number
 *           description: The ID associated with the response.
 *         errorCode:
 *           type: number
 *           description: The error code if the search was unsuccessful.
 *         error:
 *           type: string
 *           description: The error message if the search was unsuccessful.
 */

export interface FaceSearchApiErrorResponse {
  success: boolean;
  id: number;
  errorCode: number;
  error: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     FaceSearchRequest:
 *       type: object
 *       required:
 *         - base64
 *       properties:
 *         base64:
 *           type: string
 *           format: byte
 *           description: The base64-encoded string representing the image.
 */
export interface FaceSearchRequest {
  base64: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     FaceEnrollApiDTO:
 *       type: object
 *       properties:
 *         edit:
 *           type: boolean
 *           description: Indicates whether the face data is being edited.
 *         id:
 *           type: number
 *           description: The ID associated with the face data.
 *         file:
 *           type: string
 *           description: The file containing the face data.
 */
export interface FaceEnrollApiDTO {
  edit: boolean;
  id: number;
  file: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     FaceEnrollApiRequest:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/FaceEnrollApiDTO'
 *       description: Array of face enrollment data objects.
 */
export type FaceEnrollApiRequest = FaceEnrollApiDTO[];

/**
 * @swagger
 * components:
 *   schemas:
 *     FaceEnrollErrorResponseItemDTO:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the face enrollment encountered an error.
 *         image_id:
 *           type: number
 *           description: The ID associated with the image in the face enrollment process.
 *         errorCode:
 *           type: number
 *           description: The error code indicating the type of error.
 *         error:
 *           type: string
 *           description: A descriptive error message.
 */
export interface FaceEnrollErrorResponseItemDTO {
  success: boolean;
  image_id: number;
  errorCode: number;
  error: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     FaceEnrollErrorResponseDTO:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/FaceEnrollErrorResponseItemDTO'
 *       description: Array of face enrollment error response items.
 */
export type FaceEnrollErrorResponseDTO = FaceEnrollErrorResponseItemDTO[];

/**
 * @swagger
 * components:
 *   schemas:
 *     FaceEnrollSuccessResponseItemDTO:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the face enrollment was successful.
 *         indexid:
 *           type: string
 *           description: The index ID associated with the successful face enrollment.
 *         image_id:
 *           type: number
 *           description: The ID associated with the image in the face enrollment process.
 *         embeddings:
 *           type: string
 *           description: The embeddings associated with the successful face enrollment.
 */
export interface FaceEnrollSuccessResponseItemDTO {
  success: boolean;
  indexid: string;
  image_id: number;
  embeddings: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     FaceEnrollSuccessResponseDTO:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/FaceEnrollSuccessResponseItemDTO'
 *       description: Array of face enrollment success response items.
 */
export type FaceEnrollSuccessResponseDTO = FaceEnrollSuccessResponseItemDTO[];

/**
 * @swagger
 * components:
 *   schemas:
 *     FaceSearchApiSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the face search was successful.
 *         id:
 *           type: number
 *           description: The ID associated with the face search result.
 *         indexid:
 *           type: string
 *           description: The index ID associated with the face search result.
 *         distance:
 *           type: number
 *           description: The distance or similarity score of the face search result.
 */
export interface FaceSearchApiSuccessRresponse {
  success: boolean;
  id: number;
  indexid: string;
  distance: number;
}
