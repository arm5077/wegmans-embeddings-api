import dotenv from 'dotenv';
import getFormattedGroceryList from '../utils/getFormattedGroceryList.js';
import { errorResponse, successResponse } from '../utils/responses.js';
import getGroceryListEmbeddings from '../utils/getGroceryListEmbeddings.js';
import matchToAisles from '../utils/matchToAisles.js';
import aggregateToAisles from '../utils/aggregateToAisles.js';

dotenv.config();

const handler = async (event) => {
  if (!event.body) {
    return errorResponse(400, 'No information included in the body');
  };

  const { text } = JSON.parse(event.body);
  
  console.log('Formatting grocery list');
  const rawGroceryList = await getFormattedGroceryList(text);

  console.log('Getting embeddings for grocery list');
  const groceryListWithEmbeddings = await getGroceryListEmbeddings(rawGroceryList);
  const listWithAisles = await matchToAisles(groceryListWithEmbeddings);
  const listByAisle = aggregateToAisles(listWithAisles);

  return successResponse(listByAisle);
};

export { handler }