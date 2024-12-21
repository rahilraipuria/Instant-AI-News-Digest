'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

async function summarizeContent(content) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Please provide a concise summary of the following webpage content:

  ${content}

  Focus on the main points and key takeaways. Structure the summary in clear paragraphs.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error summarizing content:', error);
    throw new Error('Failed to generate summary');
  }
}

export { summarizeContent };
