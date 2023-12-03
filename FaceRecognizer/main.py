import base64
import cv2
import numpy as np
from fastapi import FastAPI, File, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse, Response
from pydantic import BaseModel
from scipy.spatial import distance
from typing import Dict, List, Optional, Tuple
import math
import time
import json
from milvus import Milvus, IndexType, MetricType, Status
import logging as log
import os
import uuid

from src.face_match import FaceEmbedding
from src.FaceValidation.src.headPose_estimator import HeadPoseEstimator
from src.FaceValidation.src.brightness_detector import BrightnessPredictor
from src.FaceValidation.src.blur_detection import detect_blur_fft
from src.FaceValidation.src.brightness_detector import BrightnessPredictor

logger = log.getLogger(__name__)
logger.setLevel(log.DEBUG)
formatter = log.Formatter('%(asctime)s:%(levelname)s:%(message)s')
file_handler = log.FileHandler('./face_recognizer.log')
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)
app = FastAPI(debug=True, docs_url='/facerec/docs', redoc_url='/facerec/redocs',openapi_url='/facerec/openapi.json')

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RemarksItems = {

    "blurryImage" : "Image is Blurry",
    "imageBrightness" : "Face is not illuminated ",
    "headPose" : "Face in image is ",
    "liveness" : "Spoof Face Image",
    "faceNotFound" : "No face found in image",
    "faceAlreadyPresent" : "Face is already registered",
    "faceNotRegister" : "Face is not enrolled"

}

def save_image(image, rest_path):
    unique_id = str(uuid.uuid4())[:8]
    # save_image_dir = 'saved_images/'
    cv2.imwrite(os.path.join(rest_path , f'{unique_id}.jpg'), image)

def __image_quality_check_(image):

    get_image_blurry_status = detect_blur_fft(image)
    get_headpose_status = []

    if not get_image_blurry_status["success"]:
        return JSONResponse({
            "success": False,
            "remarks": RemarksItems["blurryImage"]
        })

    else:
        get_image_brightness_status = brightnessdetector.face_brightness_detection(image)

        if not get_image_brightness_status:

            return JSONResponse({
                "success": False,
                "remarks": RemarksItems["imageBrightness"]
            })

        else:

            get_headpose_status = detectheadpose.predict_facePose(image)

            if len(get_headpose_status) > 0:
                if not get_headpose_status[0] == "straight":

                    return JSONResponse({
                        "success": False,
                        "remarks": f'{["headPose" + get_headpose_status[0]]}'
                    })

                else:
                    return JSONResponse({
                        "success": True 
                    })
            else:
                return JSONResponse({
                        "success": False,
                        "remarks": "Face not found" 
                    })

def __face_search__(embedding):
    _, ok = milvus.has_collection(_collection_name)

    if not ok:
        param = {
            'collection_name': _collection_name,
            'dimension': _DIM,
            'index_file_size': _INDEX_FILE_SIZE,
            'metric_type': MetricType.L2 
        }   

        print(milvus.create_collection(param))

        _, collection = milvus.get_collection_info(_collection_name)
        print(collection)

    search_param = {
        "nprobe": 16
    }
    if embedding is not None:
        param = {
            'collection_name': _collection_name,
            'query_records': embedding["embedding"],
            'top_k': 10,
            'params': search_param,
        }

        status, results = milvus.search(**param)

        if not status.OK():
            print("Search failed. ", status)
    else:
        return None
        
    for n_neighbors in results:
        if len(n_neighbors) > 0:
            return {
                "id": str(n_neighbors._id_list[0]),
                "distance": n_neighbors._dis_list[0]
                }
        else:
            return None        
       

def __get_cv2_image__(imageBase64: str):

    try:
        imgData = base64.b64decode(imageBase64)
        nparr = np.fromstring(imgData, np.uint8)

        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        # img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        _height = _image_resize_height
        aspect_ratio = float(img.shape[1])/float(img.shape[0])
        _width = _height/aspect_ratio
        img = cv2.resize(img, (int(_height),int(_width)))
        # cv2.imshow("resize_image", img)
        # cv2.waitKey(1)
        return img
    except Exception as e:
        print(e)
        return None

class  FaceEnrollViewModel(BaseModel):
    edit: bool
    id:int
    file:str

class CollectionName(BaseModel):
    collection_name:str

faceembedding = FaceEmbedding()
brightnessdetector = BrightnessPredictor()
detectheadpose = HeadPoseEstimator()

with open("config.json") as f:
    config = json.load(f)

milvus_config = config["milvus"]

_collection_name = milvus_config["collection_name"]
_HOST = milvus_config["host"]
_PORT = milvus_config["port"]
_DIM = milvus_config["dimension"]
_INDEX_FILE_SIZE = milvus_config["index_file_size"]
_image_resize_height = milvus_config["image_height"]
_threshold_of_rejection = milvus_config["threshold"]

milvus = Milvus(_HOST, _PORT, pool_size=milvus_config["pool_size"])


@app.get('/facerec', include_in_schema=False)
def index():
    return RedirectResponse('/facerec/docs')

@app.post('/facerec/face-enroll')
async def enroll_data(fileInfo: List[FaceEnrollViewModel]):
    logger.info('initialize face-enroll api')
    # embedding = []
    embedding_datas = []
    result = []
    emb_list = []
    is_face_present = None
    
    for edit, image_id_data, base64img in fileInfo:
        inference_image = __get_cv2_image__(base64img[1])
        image_id = image_id_data[1]

        # cv2.imshow(str(image_id), inference_image)
        # cv2.waitKey (5000)
        if inference_image is None:
            result.append(
                {
                    "success": False,
                    "image_id": image_id,
                    "errorCode": 1004,
                    "error": "image is empty"
                }
            )

            continue


            # return JSONResponse({
            #             "success": False,
            #             "errorCode": 1004,
            #             "error": RemarksItems["faceNotFound"]
            #             })

        # save_image(inference_image, 'save_image/live_face_image/')

        get_image_quality_status = __image_quality_check_(inference_image)

        response = (get_image_quality_status.body).decode("utf8")

        if (json.loads(response))["success"]:
            get_embeddings = faceembedding.face_embedding(inference_image)


            if not edit[1]:
                face_search_data = __face_search__(get_embeddings)

                if face_search_data:
                    # emb_list.append(get_face_data)
                    if face_search_data['distance'] < 0.4:
                        # face_exists = True
                        result.append ({
                            "success": False,
                            "image_id": image_id,
                            "errorCode": 1002,
                            "error": RemarksItems["faceAlreadyPresent"],
                            "indexid": face_search_data["id"]
                            })
                        
                        continue
                # return JSONResponse({
                #     "data": None,
                #     "success": False,
                #     "error": "Face not found"
                #     })
        else:
            # return result.append(json.loads(get_image_quality_status))
            result.append({
                    "success": False,
                    "image_id": image_id,
                    "errorCode": 1002,
                    "error": json.loads(get_image_quality_status.body)["remarks"]
                    })
            continue

        if get_embeddings is not None:
                embedding_datas.append((get_embeddings, image_id))
        else:
            result.append({
                "data": None,
                "success": False,
                "image_id": image_id,
                "error": "Face not found"
                })
            continue

    for i,emb in enumerate(embedding_datas):
        if emb[0] is not None:
            status, ids = milvus.insert(collection_name=_collection_name, records=emb[0]['embedding'])
            logger.info('face successfully registered to milvus server')
            for id in ids:
                result.append ({
                    "success": True,
                    "image_id": image_id,   
                    "indexid": str(id),
                    "embeddings" : str(emb[0]['embedding'])
                })

    if result !=[]:
        return result

@app.post('/facerec/face-search')
async def search_data(fileInfo:FaceEnrollViewModel):
    
    # unique_filename = 'search' + str(uuid.uuid4())
    # with open(f'{unique_filename}.json', 'w') as json_file:
    #     json.dump(fileInfo.file, json_file)

    inference_image = __get_cv2_image__(fileInfo.file)
    # save_image(inference_image, 'save_image/')
    if inference_image is None:
        return JSONResponse({
                    "success": False,
                    "id": fileInfo.id,
                
                    "errorCode": 1004,
                    "error": RemarksItems["faceNotFound"]
                    })
    
    get_image_quality_status = __image_quality_check_(inference_image)
    response = (get_image_quality_status.body).decode("utf8")

    if (json.loads(response))["success"]:
        _get_embeddings = faceembedding.face_embedding(inference_image)

        get_result = __face_search__(_get_embeddings)
        if get_result is not None:
            # if distance is less then threshold value, then we assume that face is already present
            is_face_present = get_result["distance"] < _threshold_of_rejection

            logger.info(f'face searched with id: {get_result["id"]}, distance: {get_result["distance"]}')
            if is_face_present:
            
                return JSONResponse({
                    "success": True,
                    "id": fileInfo.id,
                    "indexid": get_result["id"],
                    "distance": get_result["distance"]
                })
            else:
                return JSONResponse({
                    "success": False,
                    "id": fileInfo.id,
                
                    "errorCode": 1003,
                    "error": RemarksItems["faceNotRegister"]
                })    
        else:
            return JSONResponse({
                    "success": False,
                    "id": fileInfo.id,
                
                    "errorCode": 1003,
                    "error": RemarksItems["faceNotRegister"]
                })
    else:
        return JSONResponse({
            "success": False,
            "id": fileInfo.id,
        
            "errorCode": 1003,
            "error": "Please traighten up your face"
        })
         
# async def delete_index(index_id:list=Body(...)):
@app.post('/facerec/delete-index')
async def delete_index(index_ids:List[str]):
    # for index_id in index_ids:
    index_ids = [int(x) for x in index_ids]
    status = milvus.delete_entity_by_id(collection_name=_collection_name, id_array=index_ids)
    print(status)
    time.sleep(2)
    return (f"Index-id {index_ids} deleted successfully")


@app.post('/facerec/drop-collection')
async def drop_collection(col_name:CollectionName):

    status = milvus.drop_collection(col_name.collection_name)

    if status.OK():
        return (f"Collection Name {col_name.collection_name} dropped successfully")
    else:
        return ("Please check the collection name and try again") 