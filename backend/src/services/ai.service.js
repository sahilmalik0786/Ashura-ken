import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateChat(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config:{
      temperature:0.6
    }
  });
  return response.text
}

async function generateEmbedding(text){
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: text,
           config: {
            outputDimensionality: 768,
          
        }
    });
    return response.embeddings[0].values
}

async function generateTags(text) {
  const response = await ai.models.generateContent({
    model:'gemini-2.0-flash',
    contents:text,
    config:{
      systemInstruction:`
              give some categorize tags according to given text 
              and please make sure to give the relatable tags for prompt category 
              what kind of prompt tag best suite the text and give minimum one tag or word as tag and maximum of three 
              just make sure to give relatable tags and don't give the response in long format just give tags according to specific min max 
              amount i described
      `
    }
  })

  return response.text
  
}

export { generateChat, generateEmbedding , generateTags}