import { wordsCollection } from "../db/dbconnection.ts";
import { ObjectId } from "mongo";
import { Word } from "../types.ts";
import { WordSchema } from "../db/schema.ts";

export const Query = {
  getWords: async (_: unknown, params: {}): Promise<WordSchema[]> => {
    const wordsList: WordSchema[] = await wordsCollection.find({}).toArray();

    return wordsList;
  },
  getWord: async (_: unknown, params: {word: string}): Promise<string> => {
    const palabra = params.word

    console.log("Palabra introducida: ", params.word)
    const wordsList: Word = await wordsCollection.findOne({word: palabra});

    console.log("Despues de wordList", wordsList)

    return wordsList.word;
  },
};
