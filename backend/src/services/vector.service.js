import {Pinecone} from '@pinecone-database/pinecone'


const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY })
const indexName = pc.Index('chat-bot')


export const createMemory = async({vectors , metadata , messageId})=>{
     await indexName.upsert([{
        id: messageId,
        values:vectors, 
        metadata
     }])

     }


export const queryMemory = async({queryVector , limit = 5 , metadata})=>{
  const data = await indexName.query({
    vector: queryVector,
    topK : limit,
    filter: metadata,
    includeMetadata:true
  })
  return data.matches
}

