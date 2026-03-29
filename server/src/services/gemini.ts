import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
const PROMPT = `You are a top-tier note-making assistant. Take the following transcript and convert it into clean, well-structured study notes suitable for a student learning the topic. Use the following format:

1. Add a clear title and subtitle
2. Use bullet points or numbered lists for clarity
3. Highlight definitions, examples, and key points in bold or italic
4. Organize the content with meaningful headings (like Introduction, Types of ML, Key Terms, etc.)
5. Remove unnecessary filler words or casual language
6. Use Markdown formatting
7. DO NOT add any extra content outside what is in the transcript
8.Use Emojis



Output format: HTML only. Use <h1>, <h2>, <ul>, <li>, <p>. also add ascii images for better experience No CSS or JS. No explanation.
`
const api_key=process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(api_key);

export const getGeminiResponse = async (transcript: string) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent([
    PROMPT,
    `Here is the full YouTube transcript:\n\n${transcript}`,
  ]);
  console.log(result.response.text())
  return result.response.text();
}
