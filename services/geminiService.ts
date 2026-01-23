
import { GoogleGenAI } from "@google/genai";

// Robust check for process.env to prevent ReferenceError in local environments
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const getSunnahAdvice = async (query: string) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "The assistant is currently offline. Please try again later.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are an expert in Sunnah-based oral hygiene and the benefits of Miswak. 
        Your goal is to provide helpful, scientific, and faith-driven advice to users of "Sunnah Smile Toothbrush". 
        Keep answers concise, respectful, and informative. Mention the health benefits of Salvadora persica (the Miswak tree). 
        Always link advice back to the Sunnah of Prophet Muhammad (SAW) when appropriate.`,
        temperature: 0.7,
      },
    });
    return response.text || "I couldn't process that. Please ask something else about Miswak.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base right now.";
  }
};
