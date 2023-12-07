import axios from "axios";
const API_URL = import.meta.env.VITE_TTS_API_URL;

const speech_request_body = {
  text: " ",
  languages: "English",
  pitch: "medium",
  rate: "medium",
  audio_format: "wav",
  en_speaker: "hindi_female",
  indic_speaker: "kannada_female",
  db_value: "5",
  dot_break_time: "0.5",
  question_break_time: "0.6",
  commas_break_time: "0.2",
  exclaimtory_break_time: "0.4",
};

export const SpeechApiService = {
  getSpeechData: async (text) => {
    speech_request_body.text = text;
    try {
      const response = await axios.post(
        `${API_URL}/text2viseme`,
        speech_request_body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
      // const fallbackFilePath = "./src/services/txt.json";
      // const fallbackResponse = await fetch(fallbackFilePath);
      // const fallbackData = await fallbackResponse.json();
      // return fallbackData;
    } catch (error) {
      // Handle errors, log them, or throw an exception
      console.error("Error in SpeechService", error);

      throw error;
    }
  },
};
