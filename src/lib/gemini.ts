import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const DEFAULT_PROMPT = "Analyze this portrait photo for an attractiveness assessment. Your analysis should be: 1) Professional, constructive and kind, 2) Focused on objective features like facial symmetry, skin health, hair condition, styling, etc., 3) Include a numerical attractiveness score out of 100 at the beginning, 4) Provide personalized beauty enhancement recommendations. Format your response with these sections: ## Attractiveness Score: [X]/100\n\n## Attractiveness Analysis\n\n### Facial Features Assessment\n[Analysis of key facial features including symmetry, proportions, etc.]\n\n### Style & Presentation\n[Analysis of styling choices, hair, makeup if applicable, clothing visible in image]\n\n### Strengths\n[List key aesthetic strengths - at least 3-5 positive points]\n\n### Enhancement Recommendations\n[Constructive suggestions for potential improvements to enhance natural features]\n\n### Confidence & Presence\n[Tips about non-physical aspects of attractiveness like confidence, expression]\n\nFormat your response as markdown with appropriate headings.";

export async function analyzeImage(imageData: string, customPrompt?: string): Promise<string> {
  try {
    // Validate image data
    if (!imageData || !imageData.includes('base64')) {
      throw new Error('Invalid image data format');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Extract base64 data correctly, handling different data URL formats
    const base64Data = imageData.split('base64,')[1];
    if (!base64Data) {
      throw new Error('Invalid base64 image data');
    }
    
    const prompt = customPrompt?.trim() || DEFAULT_PROMPT;
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('No analysis generated');
    }
    
    return text;
  } catch (error) {
    console.error('Error analyzing image:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to analyze image: ${error.message}`);
    }
    throw new Error('Failed to analyze image. Please try again.');
  }
}