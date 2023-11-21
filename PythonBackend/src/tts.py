import time
import torch
from enum import Enum
from pydantic import BaseModel
from aksharamukha import transliterate
import craete_ssml as sml
import voice
import num2text
import update as upt

torch.set_num_threads(4)
device = torch.device('cpu')

class Supported_Languages(str, Enum):
    en = "English"
    asm = "Assamese"
    bn = "Bangali"
    gu = "Gujarati"
    hi = "Hindi" #Devanagari
    kn = "Kannada"
    ml = "Malayalam"
    mn = "Manipuri" #Bangali
    mr = "Marathi"
    ori = "Oriya"
    pa = "Punjabi"
    raj= "Rajasthani" #Devanagari
    ta = "Tamil"
    te = "Telugu"
    
class Supported_indic_Speaker(str, Enum):
    hindi_female  = "hindi_female"
    hindi_male  = "hindi_male"
    kannada_female = "kannada_female"
    kannada_male = "kannada_male"
    telugu_female = "telugu_female"
    telugu_male = "telugu_male"
    bengali_female = "bengali_female"
    bengali_male = "bengali_male"
    tamil_female = "tamil_female"
    tamil_male = "tamil_male"
    malayalam_female = "malayalam_female"
    malayalam_male = "malayalam_male"
    manipuri_female = "manipuri_female"
    manipuri_male = "manipuri_male"
    assamese_female = "assamese_female"
    assamese_male = "assamese_male"
    gujarati_female = "gujarati_female"
    gujarati_male = "gujarati_male"
    rajasthani_female = "rajasthani_female"
    rajasthani_male = "rajasthani_male"
    
class Supported_en_Speaker(str, Enum):
    hindi_female  = "hindi_female"
    kannada_female = "kannada_female"
    kannada_male = "kannada_male"
    bengali_female = "bengali_female"
    bengali_male = "bengali_male"
    tamil_female = "tamil_female"
    tamil_male = "tamil_male"
    malayalam_male = "malayalam_male"
    manipuri_female = "manipuri_female"
    assamese_female = "assamese_female"
    gujarati_female = "gujarati_female"
    gujarati_male = "gujarati_male"
    telugu_male = "telugu_male"
    rajasthani_female = "rajasthani_female "
    assamese_male = "assamese_male"
    random = "random"
    # Speaker should be in : tamil_female, bengali_female, malayalam_male, manipuri_female, assamese_female, gujarati_male, 
    # telugu_male, kannada_male, hindi_female, rajasthani_female, kannada_female, bengali_male, tamil_male, gujarati_female, assamese_male, random
    
class Supported_Pitch(str, Enum):
    medium = "medium"
    x_low = "x-low"
    low = "low"
    high = "high"
    x_high = "x-high"
    # x-low, low, medium, high, x-high
class Supported_Rate(str, Enum):
    medium = "medium"
    x_slow = "x-slow"
    slow = "slow"
    fast = "fast"
    x_fast = "x-fast"
    # x-slow, slow, medium, fast, x-fast
class Supported_Audio_Format(str, Enum):
    wav = "wav"
    mp3 = "mp3"
    ogg = "ogg"
    opus = "opus"
    flac = "flac"
    m4p = "m4p"
    
class Audio_db_Value(str, Enum):
    _2 = "2"
    _3 = "3"
    _4 = "4"
    _5 = "5"
    _6 = "6"
    _7 = "7"
    _8 = "8"
    _9 = "9"
    _10 = "10"
    _15 = "15"
    _20 = "20"
    _25 = "25"
    _30 = "30"
    _35 = "35"
    
# class TextToSpeechRequest(BaseModel):
#     text: str

class TextToSpeechRequest(BaseModel):
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


        
class TextToSpeechService:

    def __init__(self):
        pass
        
    
    def load_en_tts_models(self, en_model):
        print("en_tts_Model is Loading...................")
        roman_model = torch.package.PackageImporter(en_model).load_pickle("tts_models", "model")
        roman_model.to(device) 
        upt.roman_model = roman_model
        # regional_model = torch.package.PackageImporter(indic_model).load_pickle("tts_models", "model")
        # regional_model.to(device)
        # return roman_model
    
    def load_indic_tts_models(self, indic_model): 
        print("indic_tts_Model is Loading...................")
        regional_model = torch.package.PackageImporter(indic_model).load_pickle("tts_models", "model")
        regional_model.to(device)
        upt.regional_model = regional_model
        # return regional_model

    def remove_white_space(self, input_text):
        return ' '.join(input_text.split())
    
    def generate_en_audio(self, text, en_speaker, db_value, dot_break_time, commas_break_time, 
                          question_break_time, exclamation_break_time, rate, pitch):
        sample_rate = 48000
        put_accent=True
        put_yo=True
        print(text)
        # Preprocessing the input text
        txt = self.remove_white_space(text)
        text = num2text.number_to_text(txt)
        # # Converting normal text to ssml format
        ssml_text = sml.create_ssml_text(text, dot_break_time, commas_break_time, question_break_time, exclamation_break_time ,rate, pitch)
        print(ssml_text)
        en_audio = upt.roman_model.save_wav(ssml_text=ssml_text, speaker=en_speaker, sample_rate=sample_rate)
        return en_audio

    def generate_indic_audio(self, indic_text, in_language, indic_speaker, db_value, dot_break_time, commas_break_time, 
                             question_break_time, exclamation_break_time, rate, pitch):
        if in_language == Supported_Languages.hi:
            in_language = "Devanagari"
        elif in_language == Supported_Languages.raj:
            in_language = "Devanagari"
        elif in_language== Supported_Languages.mn:
            in_language= "Bengali" 
        print(indic_text)
        roman_text = transliterate.process(in_language, 'ISO', indic_text)
        print("Transliterated texts :",roman_text)
        sample_rate = 48000 #8000,16000,48000
        put_accent=True
        put_yo=True
        # Preprocessing the input text
        txt = self.remove_white_space(roman_text)
        text = num2text.number_to_text(txt)
        # # Converting normal text to ssml format
        ssml_text = sml.create_ssml_text(text, dot_break_time, commas_break_time, question_break_time, exclamation_break_time ,rate, pitch)
        print(ssml_text)
        indic_audio = upt.regional_model.save_wav(ssml_text=ssml_text, speaker=indic_speaker, sample_rate=sample_rate)
        return indic_audio

    def generate_audio(self, text, language, en_speaker, indic_speaker, db_value, dot_break_time, commas_break_time, 
                      question_break_time, exclamation_break_time, rate, pitch):
        # Generate audio based on the selected language
        if language == Supported_Languages.en:
            return self.generate_en_audio(text, en_speaker, db_value, dot_break_time, commas_break_time, 
                                           question_break_time, exclamation_break_time, rate, pitch)
        else:
            return self.generate_indic_audio(text, language, indic_speaker, db_value, dot_break_time, commas_break_time, 
                                              question_break_time, exclamation_break_time, rate, pitch)

    
    def post_process_audio(self, audio_file, db_value, audio_format):
        # Process audio, adjust volume, remove noise, and convert format
        audio_file = voice.voice_db(audio_file, db_value)
        audio_file = voice.remove_noise(audio_file, silence_threshold=-35, chunk_size=250) 
        audio = voice.convert_audio_file(audio_file, audio_format)
        return audio
        # if audio_format == Supported_Audio_Format.wav:
        #     return audio
        # else:
        #     audio = voice.convert_audio_file(audio, audio_format)
        #     return audio
        

    def text_to_speech(self, request, language, pitch, rate, audio_format, 
                       en_speaker, indic_speaker, db_value, dot_break_time, 
                       question_break_time, commas_break_time, 
                       exclamation_break_time):
        if not request:
            raise ValueError("Input text is required")

        starttime = time.time()

        audio = self.generate_audio(request, language, en_speaker, indic_speaker, db_value, dot_break_time, 
                                    commas_break_time, question_break_time, exclamation_break_time, rate, pitch)
        
        # Process audio, adjust volume, remove noise, and convert format
        # audio = self.post_process_audio(audio, db_value, audio_format)

        # return StreamingResponse(content=audio, media_type=f"audio/{audio_format}")
        return audio
    
    