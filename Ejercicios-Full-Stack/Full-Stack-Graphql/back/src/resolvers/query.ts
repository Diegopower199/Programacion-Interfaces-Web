import { wordsCollection } from "../db/dbconnection.ts";
import { ObjectId } from "mongo";
import { Word } from "../types.ts";
import { WordSchema } from "../db/schema.ts";

export const Query = {
  getWords: async (_: unknown, params: {}): Promise<WordSchema[]> => {
    const wordsList: WordSchema[] = await wordsCollection.find({}).toArray();

    return wordsList;
  },
};
