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
from fastapi.responses import PlainTextResponse
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import uvicorn
import wave
import io

app = FastAPI(debug=True, docs_url='/text2speech/docs', redoc_url='/text2speech/redocs',openapi_url='/text2speech/openapi.json')
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
    


def generate_lip_sync_json(input_audio_file, output_json_file, language='english'):
    # command to execute
    if language.lower() == 'english':
        language_option = '-r pocketSphinx'  # English recordings
    else:
        language_option = '-r phonetic'  # Non-English recordings

    command = [
        './src/Rhubarb/rhubarb',           # Path to the rhubarb executable
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


@app.get('/text2speech', include_in_schema=False)
def index():
    return RedirectResponse('/text2speech/docs')

@app.post("/text2speech")
async def text_to_speech(Request: request):
    print(Request)
    if not Request.text:
        raise HTTPException(status_code=400, detail="Input text is required")

    audio_buf = TTS.text_to_speech(Request)
    audio_byte_data, wav_params = wav_to_bytes(audio_buf)
    generate_lip_sync_json(audio_buf, 'output.txt')

    import json
    with open('output.txt', 'r') as file:
        original_json_string = file.read()

    data = json.loads(original_json_string)
    new_sound_file = str(audio_byte_data)
    data['metadata']['soundFile'] = new_sound_file
    modified_json_string = json.dumps(data, indent=2)
    with open('test.txt', 'w') as file:
        file.write(modified_json_string)
    file = open("test.txt", "r")
    return PlainTextResponse(file.read())
    

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8008, log_level="info")
    



