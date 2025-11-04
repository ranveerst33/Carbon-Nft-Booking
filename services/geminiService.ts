import { GoogleGenAI } from "@google/genai";
import type { BookingData, NftData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateDescription = async (bookingData: BookingData): Promise<string> => {
  const { projectName, location, co2Tons } = bookingData;
  const prompt = `Generate a creative and inspiring description for a Carbon Credit NFT.
  The project is named "${projectName}", located in "${location}", and represents an offset of ${co2Tons} tons of CO2.
  The description should be futuristic, hopeful, and emphasize the unique digital ownership of this environmental contribution.
  Keep it concise and powerful, under 80 words.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text.trim();
};

const generateImage = async (bookingData: BookingData): Promise<string> => {
  const { projectName, location } = bookingData;
  const prompt = `Create a stunning digital art piece for an NFT representing a carbon offset project.
  The theme is "${projectName} in ${location}".
  It should look futuristic, abstract, and blend elements of nature (like forests, oceans, clean air) with glowing, digital, geometric patterns.
  The overall feeling should be hopeful and technologically advanced.
  Focus on vibrant colors, high detail, and cinematic lighting. Style: ethereal digital art.`;

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: '1:1',
      outputMimeType: 'image/jpeg',
    }
  });

  if (response.generatedImages && response.generatedImages.length > 0) {
    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  }
  
  throw new Error("Image generation failed.");
};

export const generateCarbonNft = async (bookingData: BookingData): Promise<Omit<NftData, 'timestamp'>> => {
  try {
    const [description, imageUrl] = await Promise.all([
      generateDescription(bookingData),
      generateImage(bookingData)
    ]);

    return {
      description,
      imageUrl,
      projectName: bookingData.projectName,
      location: bookingData.location,
      co2Tons: bookingData.co2Tons
    };
  } catch (error) {
    console.error("Error generating Carbon NFT:", error);
    throw new Error("Failed to generate NFT content. Please check your API key and try again.");
  }
};