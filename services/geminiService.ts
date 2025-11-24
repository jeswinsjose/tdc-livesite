import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ProjectEstimate } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const estimateSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    serviceRecommended: {
      type: Type.STRING,
      description: "The most suitable AEC service (e.g., BIM Modeling, 3D Laser Scanning, CAD Conversion)."
    },
    estimatedDuration: {
      type: Type.STRING,
      description: "Rough time estimate (e.g., 2-3 Weeks)."
    },
    complexityLevel: {
      type: Type.STRING,
      description: "Low, Medium, or High complexity rating."
    },
    keyConsiderations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 bullet points on technical considerations for this project."
    }
  },
  required: ["serviceRecommended", "estimatedDuration", "complexityLevel", "keyConsiderations"]
};

export const analyzeProjectScope = async (projectDescription: string): Promise<ProjectEstimate> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze this architectural/construction project request and provide a technical estimation: "${projectDescription}"`,
      config: {
        systemInstruction: "You are a senior technical director at an architectural drafting firm. Be precise, professional, and terse.",
        responseMimeType: "application/json",
        responseSchema: estimateSchema,
        temperature: 0.2
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as ProjectEstimate;
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};
