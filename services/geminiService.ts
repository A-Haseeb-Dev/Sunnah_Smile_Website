
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSunnahAdvice = async (query: string) => {
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
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later or consult our FAQ.";
  }
};
