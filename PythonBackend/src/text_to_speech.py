#text to speech class
#visme

import ray
from ray import serve
from starlette.requests import Request
import time
import tts
from fastapi import FastAPI, HTTPException
from starlette.responses import StreamingResponse, FileResponse
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

import librosa
import noisereduce as nr
import soundfile as sf

en_model = './models/v3_en_indic.pt'
indic_model = './models/v3_indic.pt'
TTS = tts.TextToSpeechService()
# @serve.deployment(ray_actor_options={"num_gpus": 0.5}, route_prefix="/indic_en")

class TTSModule:

    def __init__(self):
        # Load the en-TTS model.
        TTS.load_en_tts_models(en_model)
        # tts.Model.load_model(en_model, indic_model)
        print("en_tts model is loaded.............................")
        # Load the indic-TTS model.
        TTS.load_indic_tts_models(indic_model)
        # # tts.Model.load_model(en_model, indic_model)
        print("indic_tts model is loaded.............................")
    

    def get(self):
        return "Welcome to the en and indic TTS model server."
    
    async def text_to_speech(self, request: tts.TextToSpeechRequest):
        print(request)
        if not request.text:
            raise HTTPException(status_code=400, detail="Input text is required")

        starttime = time.time()
        audio_buf = TTS.text_to_speech(request.text, request.languages, request.pitch, request.rate, request.audio_format, 
                        request.en_speaker, request.indic_speaker, request.db_value, request.dot_break_time, 
                        request.question_break_time, request.commas_break_time, 
                        request.exclaimtory_break_time)
        
        y, sr = librosa.load(audio_buf, sr=None)

        # Perform noise reduction
        reduced_noise = nr.reduce_noise(y=y, sr=sr)

        # Save the noise-reduced audio
        output_file = "output_audio.wav"
        sf.write(audio_buf, reduced_noise, sr)

        # return FileResponse(path=audio_buf, filename=audio_buf)
        # return FileResponse(path="output_audio.wav", filename="output_audio.wav")
        return FileResponse(path=audio_buf, filename=audio_buf)
    


