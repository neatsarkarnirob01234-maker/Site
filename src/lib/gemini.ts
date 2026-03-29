import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeImageForSearch(base64Data: string, mimeType: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: "Identify the main product in this image. Provide a concise 2-3 word search query that would be used to find this item in an online store. Return ONLY the search query text, no other words." },
            { inlineData: { data: base64Data, mimeType } }
          ]
        }
      ]
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}
