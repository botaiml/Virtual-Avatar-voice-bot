#main code comes here

# API bot_speech_gen
# input : str
# output :
# {
#     audio: bytes
#     mouthque: array[dict]
#     durtion: float
# }

from src import text_to_speech
from fastapi import FastAPI, HTTPException
from fastapi.responses import PlainTextResponse, FileResponse, StreamingResponse, JSONResponse
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import uvicorn
import wave
import io
import base64

app = FastAPI(debug=True, docs_url='/text2viseme/docs', redoc_url='/text2viseme/redocs',openapi_url='/text2viseme/openapi.json')
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TTS = text_to_speech.TTSModule()

class request(BaseModel):
    text: str
    languages: str
    pitch: str
    rate: str 
    audio_format: str 
    en_speaker: str
    indic_speaker: str
    db_value: str
    dot_break_time: str
    question_break_time: str
    commas_break_time: str
    exclaimtory_break_time: str

def wav_to_bytes(file_path):
    
    with wave.open(file_path, 'rb') as wave_file:
        frames = wave_file.readframes(-1)
        params = wave_file.getparams()
        byte_data = io.BytesIO(frames)
        return byte_data.getvalue(), params

def wav_to_b64(file_path):
    try:
        with open(file_path, 'rb') as audio_file:
            # Read the audio file content
            audio_content = audio_file.read()

            # Convert the audio content to base64 string
            base64_audio = base64.b64encode(audio_content).decode('utf-8')

            return base64_audio
        
    except FileNotFoundError:
        print("File not found. Please provide a valid file path.")
        return None
    
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None


def generate_lip_sync_json(input_audio_file, output_json_file, language='english'):
    # command to execute
    if language.lower() == 'english':
        language_option = '-r pocketSphinx'  # English recordings
    else:
        language_option = '-r phonetic'  # Non-English recordings

    command = [
        './PythonBackend/src/AudioToVissemes/Rhubarb/rhubarb', # Path to the rhubarb executable
        '-o', output_json_file,     # Output JSON file
        '-f', 'json',          # Output format as JSON
        language_option, 
        # '-r', 'pocketSphinx',  # Options: pocketSphinx (use for English recordings), phonetic (use for non-English recordings)
        input_audio_file      # Input audio file
    ]
    try:
        # Execute the command using subprocess
        subprocess.run(command, check=True)
        print(f"Lip-sync JSON file generated: {output_json_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")


@app.get('/text2viseme', include_in_schema=False)
def index():
    return RedirectResponse('/text2viseme/docs')

@app.post("/text2viseme")
async def text_to_speech(Request: request):
    print(Request)
    if not Request.text:
        raise HTTPException(status_code=400, detail="Input text is required")

    audio_file_path = TTS.text_to_speech(Request)
    # audio_byte_data, wav_params = wav_to_bytes(audio_buf)
    generate_lip_sync_json(audio_file_path, 'output.txt')
    # file = open("output.txt", "r")
    audio_b64 = wav_to_b64(audio_file_path)

    import json
    with open('output.txt', 'r') as file:
        original_json_string = file.read()

    data = json.loads(original_json_string)
    # new_sound_file = str(audio_byte_data)
    data['metadata']['soundFile'] = audio_b64
    # modified_json_string = json.dumps(data, indent=2)
    # with open('test.txt', 'w') as file:
    #     file.write(modified_json_string)
    # with open("test.txt", "r") as file:
    #     data = json.load(file)
    
    # print(data)
    return JSONResponse(data)
    # return PlainTextResponse(file.read())
   






if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8008, log_level="info")
    



