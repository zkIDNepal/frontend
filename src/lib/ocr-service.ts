import { toast } from "sonner";

interface OCRResponse {
  is_nepali_citizenship: boolean;
  data?: {
    full_name: string;
    date_of_birth: string;
    nationality: string;
  };
  message?: string;
}

export const verifyDocument = async (imageData: string): Promise<OCRResponse> => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: imageData.split(",")[1], // Remove the data URL prefix
                  },
                },
                {
                  text: "Analyze this document and respond in English with a JSON object. If the text is in Nepali then change it into English. The dates maybe in BS, if it is in BS change that to AD as well. First, check if this is a Nepali citizenship document. If it is a Nepali citizenship, return a JSON object with the following structure: {\"is_nepali_citizenship\": true, \"data\": {\"full_name\": \"\", \"date_of_birth\": \"\", \"nationality\": \"\"}}. If it is not a Nepali citizenship, return: {\"is_nepali_citizenship\": false, \"message\": \"This is not a Nepali citizenship document\"}.",
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to verify document");
    }

    const result = await response.json();
    console.log("Raw API Response:", result);
    
    const text = result.candidates[0].content.parts[0].text;
    console.log("Extracted Text:", text);
    
    // Extract JSON from markdown code block
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }
    
    const jsonStr = jsonMatch[1];
    console.log("Extracted JSON String:", jsonStr);
    
    const parsedResult = JSON.parse(jsonStr);
    console.log("Parsed Result:", parsedResult);
    
    return parsedResult;
  } catch (error) {
    console.error("Error verifying document:", error);
    toast.error("Failed to verify document. Please try again.");
    throw error;
  }
}; 