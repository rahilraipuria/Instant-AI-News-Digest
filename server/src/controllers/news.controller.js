import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const generateQuestions = async (req, res) => {
  const { text } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const schema = {
    description: "Questions",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        question: {
          type: SchemaType.STRING,
          nullable: false,
        },
        option1: {
          type: SchemaType.STRING,
          nullable: false,
        },
        option2: {
          type: SchemaType.STRING,
          nullable: false,
        },
        option3: {
          type: SchemaType.STRING,
          nullable: false,
        },
        option4: {
          type: SchemaType.STRING,
          nullable: false,
        },
        answer: {
          type: SchemaType.STRING,
          nullable: false,
        },
      },
      required: [
        "question",
        "option1",
        "option2",
        "option3",
        "option4",
        "answer",
      ],
    },
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const result = await model.generateContent(
    `Generate a list of questions that relates to the following news article: ${text}.`
  );
  console.log(result.response.text());

  return res
    .status(201)
    .json(
      new ApiResponse(200, result.response, "Questions generated successfully")
    );
};

const summarize = async (req, res) => {
    const {text}=req.body
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Summarize the following news article in bullet points: ${text}`;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    
    return res
    .status(201)
    .json(
      new ApiResponse(200, result.response.text(), "Summary generated successfully")
    );
};
export { generateQuestions ,summarize};
