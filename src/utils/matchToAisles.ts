import similarity from "compute-cosine-similarity";
import directory from '../data/wegmans-wisconsin-ave-embeddings.json';

export default async function matchToAisles(list) {

  const matchedList = await Promise.all(list.map(async (listItem) => {
    const listItemEmbedding = listItem.embedding;
    const nearestNeighbor = directory.reduce((nearest, directoryItem) => {
      const directoryItemEmbedding = directoryItem.embedding;
      const similarityScore = similarity(listItemEmbedding, directoryItemEmbedding) || 0;
      if (similarityScore > nearest.similarity) {
        return { 
          location: directoryItem.location, 
          category: directoryItem.item, 
          similarity: similarityScore 
        };
      }
      return nearest;
    }, { location: null, category: null, similarity: -1 });

    return { 
      name: listItem.name,
      amount: listItem.amount, 
      location: nearestNeighbor.location, 
      category: nearestNeighbor.category,
      similarity: nearestNeighbor.similarity,
    };
  }));

  return matchedList;

}