export const typeDefs = `
type Word{
  word: String
}
type Query{
  getWords: [Word!]!
}
type Mutation{
  addWord(word: String!): Word!
  deleteAllWords: String!
}`;
