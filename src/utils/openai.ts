import OpenAI from 'openai';

export async function getChatCompletion(opts) {
  const {
    messages,
    response_format={ "type": "json_object" },
    model="gpt-4o",
  } = opts;

  const openai = new OpenAI();

  const response = await openai.chat.completions.create({
    ...opts,
    model,
    messages,
    response_format,
  });

  if (response_format?.type === 'json_object') {
    if (response.choices.length === 1) {
      console.log(response.choices[0].message.content);
      return JSON.parse(response.choices[0].message.content);
    }   
    return response.choices.map(d => JSON.parse(d.message.content));
  }

  if (response.choices.length === 1) {
    return response.choices[0].message.content
  }

  return response.choices;
}

export async function getSimpleChatCompletion(content, opts) {
  const messages =  [{
    role: 'user',
    content,
  }];

  return await getChatCompletion({
    messages,
    ...opts
  })
}

export async function getEmbeddings(input, model = 'text-embedding-3-small') {
  const strings = typeof input === 'string'
    ? [input]
    : input;

  const openai = new OpenAI();
  return await openai.embeddings.create({
    model,
    input: strings,
    encoding_format: "float",
  });
}

export function textToJSON(text) {
  return JSON.parse(
    text
      .replace('json', '')
      .replace(/```/g, '')
  );
}