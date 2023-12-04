#text to speech class
#visme
import src.tts  as tts
import librosa
import noisereduce as nr
import soundfile as sf


en_model = './src/models/v3_en_indic.pt'
indic_model = './src/models/v3_indic.pt'
TTS = tts.TextToSpeechService()

class TTSModule:
    def __init__(self):
        # Load the en-TTS model.
        TTS.load_en_tts_models(en_model)
        print("en_tts model is loaded.............................")
        # Load the indic-TTS model.
        TTS.load_indic_tts_models(indic_model)
        print("indic_tts model is loaded.............................")
    
    def text_to_speech(self, request):
        audio_buf = TTS.text_to_speech(request.text, request.languages, request.pitch, request.rate, request.audio_format, 
                        request.en_speaker, request.indic_speaker, request.db_value, request.dot_break_time, 
                        request.question_break_time, request.commas_break_time, 
                        request.exclaimtory_break_time)
        
        # For noise reduction
        y, sr = librosa.load(audio_buf, sr=None)
        reduced_noise = nr.reduce_noise(y=y, sr=sr)
        
        # Save the noise-reduced audio
        output_file = "output_audio.wav"
        sf.write(output_file, reduced_noise, sr)
        return output_file

# an instance of TTSModule
task = TTSModule()

# Example for request dictionary
request = {
    "text": "today is bank holiday.",
    "languages": "English",
    "pitch": "medium",
    "rate": "medium",
    "audio_format": "wav",
    "en_speaker": "hindi_female",
    "indic_speaker": "kannada_female",
    "db_value": "5",
    "dot_break_time": "0.5",
    "question_break_time": "0.6",
    "commas_break_time": "0.2",
    "exclaimtory_break_time": "0.4"
}

# result_file = task.text_to_speech(request)
# print(f"Generated audio file: {result_file}")

