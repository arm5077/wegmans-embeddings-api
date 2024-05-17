import { SYSTEM_PROMPT } from '../constants';
import { getChatCompletion, textToJSON } from './openai';
import { GroceryList } from '../types/GroceryList';

const getFormattedGroceryList = async (text: string): Promise<GroceryList> => {

  // Define the messages for the chat conversation
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: `Here is the list: ${text}`}
  ];

  // Make the chat request to OpenAI
  const response = await getChatCompletion({ 
    messages,
    response_format: { type: 'text' }
  });

  const list = textToJSON(response);
  return list;
}

export default getFormattedGroceryList;