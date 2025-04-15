import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const GeminiApiCall = async (prompt, history = []) => {
  const chatSession = model.startChat({
    generationConfig,
    history: history,
  });
  const result = await chatSession.sendMessage(prompt);
  const responseText = result.response.text();
  return responseText;
};

export { GeminiApiCall };
