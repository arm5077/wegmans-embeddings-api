const dotenv = require('dotenv');
const OpenAI = require("openai");
const fs = require('fs');
const directory = require('../data/wegmans-wisconsin-ave-directory.json');
const supplementaryItems = require('./supplementaryItems');

dotenv.config();
const openai = new OpenAI();

(async () => {
  const combined = [
    ...directory,
    ...supplementaryItems
  ]
  const strings = combined.map(obj => `This is a grocery store item: ${obj.item}`);  

  console.log(JSON.stringify(strings, ' ', 2));

  const embeddings = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: strings,
    encoding_format: "float",
  });

  const directory_with_embeddings = combined.map((obj, i) => ({
    ...obj,
    embedding: embeddings.data[i].embedding
  }));

  fs.writeFileSync('./src/data/wegmans-wisconsin-ave-embeddings.json', JSON.stringify(directory_with_embeddings));
 
})();
