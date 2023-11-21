from pydub import AudioSegment
from pydub.silence import split_on_silence
# from pydub.playback import play
import os

# Convert a WAV audio file to MP3, OGG, OPUS, M4A, or FLAC format using Pydub.
def convert_audio_file(input_path, output_format):
    
    # To Check if the output format is valid
    if output_format not in ['mp3', 'ogg', 'opus', 'm4a', 'flac', 'wav']:
        raise ValueError("Invalid output format. Valid options are 'mp3', 'ogg', 'opus', 'm4a', and 'flac'.")

    # To Load the audio file using Pydub
    audio = AudioSegment.from_wav(input_path)

    # To Set the output file name and format
    output_path = os.path.splitext(input_path)[0] + '.' + output_format

    # To Export the audio to the desired format using Pydub
    audio.export(output_path, format=output_format)

    return output_path

# input_path = 'test.wav'
# output_format = 'opus'
# output_path = convert_audio_file(input_path, output_format)

def voice_db(audio, db_value):
    wav_file = AudioSegment.from_file(file = audio,
                                    format = "wav")

    wav_file = AudioSegment.from_file(audio)
    louder_wav_file = wav_file + int(db_value)

    # Export louder audio file
    louder_wav_file.export(out_f = "louder_wav_file.wav",
                       format = "wav")
    output_audio = "louder_wav_file.wav"
    
# voice_db("test.wav", 5)
# play("louder_wav_file.wav")




def remove_noise(audio_file, silence_threshold=-50, chunk_size=200):
    # Load the audio file
    audio = AudioSegment.from_file(audio_file)

    # Split the audio into chunks on silence
    chunks = split_on_silence(audio, min_silence_len=chunk_size, silence_thresh=silence_threshold)

    # Create a new AudioSegment to store the filtered audio
    filtered_audio = AudioSegment.silent(duration=0)

    # Iterate over the chunks and append non-silent parts to the filtered audio
    for chunk in chunks:
        if chunk.dBFS > silence_threshold:
            filtered_audio += chunk

    # Export the filtered audio as a new file
    filtered_audio.export("filtered_audio.wav", format="wav")
    get_audio = "filtered_audio.wav"

# Example usage
# remove_noise("louder_wav_file.wav", silence_threshold=-35, chunk_size=250)
# # play("filtered_audio.wav")