import { getEmbeddings } from "./openai";
import { EMBEDDING_MODEL } from "../constants";

export default async function getGroceryListEmbeddings(list) {
  const strings = list.map(obj => `This is a grocery store item: ${obj.name}`);  
  const embeddings = await getEmbeddings(strings, EMBEDDING_MODEL);
  return list.map((item, i) => ({
    ...item,
    embedding: embeddings.data[i].embedding
  }));
}