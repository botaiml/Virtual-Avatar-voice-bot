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

export interface FaceSearchApiSuccessRresponse {
  success: boolean;
  id: number;
  indexid: string;
  distance: number;
}

/**
 * @swagger
 * definitions:
 *   FaceEnrollApiDTO:
 *     type: object
 *     properties:
 *       edit:
 *         type: boolean
 *       id:
 *         type: integer
 *       file:
 *         type: string
 */

export interface FaceEnrollApiDTO {
  edit: boolean;
  id: number;
  file: string;
}
/**
 * @swagger
 * definitions:
 *   EditListDTO:
 *     type: array
 *     items:
 *       $ref: '#/definitions/FaceEnrollApiDTO'
 */

export type FaceEnrollApiRequest = FaceEnrollApiDTO[];

/**
 * @swagger
 * definitions:
 *   FaceEnrollErrorResponseItemDTO:
 *     type: object
 *     properties:
 *       success:
 *         type: boolean
 *       image_id:
 *         type: integer
 *       errorCode:
 *         type: integer
 *       error:
 *         type: string
 */

export interface FaceEnrollErrorResponseItemDTO {
  success: boolean;
  image_id: number;
  errorCode: number;
  error: string;
}

/**
 * @swagger
 * definitions:
 *   FaceEnrollErrorResponseDTO:
 *     type: array
 *     items:
 *       $ref: '#/definitions/FaceEnrollErrorResponseItemDTO'
 */

export type FaceEnrollErrorResponseDTO = FaceEnrollErrorResponseItemDTO[];

/**
 * @swagger
 * definitions:
 *   FaceEnrollSuccessResponseItemDTO:
 *     type: object
 *     properties:
 *       success:
 *         type: boolean
 *       image_id:
 *         type: integer
 *       indexid:
 *         type: string
 *       embeddings:
 *         type: string
 */

export interface FaceEnrollSuccessResponseItemDTO {
  success: boolean;
  indexid: string;
  image_id: number;
  embeddings: string;
}

/**
 * @swagger
 * definitions:
 *   FaceEnrollSuccessResponseDTO:
 *     type: array
 *     items:
 *       $ref: '#/definitions/FaceEnrollSuccessResponseItemDTO'
 */

export type FaceEnrollSuccessResponseDTO = FaceEnrollSuccessResponseItemDTO[];
