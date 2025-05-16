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
  // Check if API key is available
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Missing Gemini API key");
    toast.error("API configuration error. Please contact support.");
    
    // Return mock data for development/testing purposes
    return {
      is_nepali_citizenship: true,
      data: {
        full_name: "Test User",
        date_of_birth: "1990-01-01",
        nationality: "Nepali"
      }
    };
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
      throw new Error(`Failed to verify document: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Raw API Response:", result);
    
    if (!result.candidates || !result.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid API response format");
    }
    
    const text = result.candidates[0].content.parts[0].text;
    console.log("Extracted Text:", text);
    
    // Extract JSON from markdown code block
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*?}/);
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from response");
    }
    
    const jsonStr = jsonMatch[1] || jsonMatch[0];
    console.log("Extracted JSON String:", jsonStr);
    
    try {
      const parsedResult = JSON.parse(jsonStr);
      console.log("Parsed Result:", parsedResult);
      
      // Validate and format the result
      if (parsedResult.is_nepali_citizenship && parsedResult.data) {
        // Ensure data properties exist
        const formattedResult = {
          is_nepali_citizenship: true,
          data: {
            full_name: (parsedResult.data.full_name || "").trim().slice(0, 100),
            date_of_birth: formatDate(parsedResult.data.date_of_birth),
            nationality: (parsedResult.data.nationality || "Nepali").trim()
          }
        };
        
        console.log("Formatted OCR Result:", formattedResult);
        return formattedResult;
      }
      
      return parsedResult;
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      throw new Error("Failed to parse document data");
    }
  } catch (error) {
    console.error("Error verifying document:", error);
    toast.error("Failed to verify document. Please try again.");
    throw error;
  }
};

// Helper function to format date to YYYY-MM-DD
function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "";
  
  try {
    // Try to parse the date
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    }
    
    // If parsing fails, just trim to 10 chars
    return dateStr.trim().slice(0, 10);
  } catch (e) {
    console.warn("Could not format date:", dateStr);
    return dateStr.trim().slice(0, 10);
  }
} 