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
// Assume 'ai' is your initialized AI client
async function generateTitle(context) {
    try {
        // The high-level instruction for the model
        const systemInstruction = `You are an expert at creating short, concise chat titles of 5 words or less. Respond ONLY with the title.`;

        // Your examples are part of the conversation history for the model to learn from
        const fewShotExamples = [
            {
                role: "user",
                parts: [{ text: `CONVERSATION:\nuser: "Hey, can you help me write a Python script to connect to a PostgreSQL database and fetch some user data?"\nModel: "Of course. You'll need the 'psycopg2' library. Here's how you can set it up..."\n\nGenerate a title for the preceding conversation.` }]
            },
            {
                role: "model",
                parts: [{ text: "Python PostgreSQL Connection Script" }]
            },
            {
                role: "user",
                parts: [{ text: `CONVERSATION:\nuser: "What are the best practices for managing state in a large React application?"\nmodel: "That's a great question. Common solutions include Redux for complex global state, or the built-in Context API for simpler cases..."\n\nGenerate a title for the preceding conversation.` }]
            },
            {
                role: "model",
                parts: [{ text: "React State Management Practices" }]
            }
        ];

        // Combine the examples with the new conversation context
        // We format the last user message to explicitly ask for a title.
        const lastUserTurn = context.pop(); // Get the last turn
        const lastPrompt = `CONVERSATION:\n${context.map(turn => `${turn.role}: "${turn.parts[0].text}"`).join('\n')}\n${lastUserTurn.role}: "${lastUserTurn.parts[0].text}"\n\nGenerate a title for the preceding conversation.`;

        const finalContent = [
            ...fewShotExamples,
            {
                role: "user",
                parts: [{ text: lastPrompt }]
            }
        ];
        
        // This is the model instance, not the generateContent function
        // const model = ({
        //      model: 'gemini-1.5-flash-latest', // Use a valid and recommended model name
        //      systemInstruction: systemInstruction,
        // });

        const result = await ai.models.generateContent({
           model: 'gemini-2.0-flash', // Use a valid and recommended model name
            contents: finalContent,
            config:{
              systemInstruction:systemInstruction
            },
            generationConfig: {
                temperature: 0.1,
            },
        });
        
        // **FIX 2: Use the .text() method to correctly extract the response**
       
        // const titleText = response.text().trim();

        // console.log("Generated Title:", titleText);
        return  result.text;

    } catch (error) {
        console.error("Error generating title:", error);
        // Provide a fallback title
        return "New Chat";
    }
}

export { generateChat, generateEmbedding , generateTags ,generateTitle}