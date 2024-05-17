export const SYSTEM_PROMPT = `
  The following is a grocery list. 
  Please extract all the items and their amounts, 
  and output it as an array of the following format in JSON: 
  \`\`\`
  {
    name: string,
    amount: string
  }[]
  \`\`\`
`

export const EMBEDDING_MODEL = 'text-embedding-3-small';