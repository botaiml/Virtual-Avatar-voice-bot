export const createAudioFromBase64 = (base64String) => {
  try {
    // Convert base64 string to binary data
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create Blob and Audio elements
    const blob = new Blob([bytes], { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(blob);
    const audios = new Audio(audioUrl);

    return audios;
  } catch (error) {
    console.error("Error creating audio:", error);
    return null;
  }
};
