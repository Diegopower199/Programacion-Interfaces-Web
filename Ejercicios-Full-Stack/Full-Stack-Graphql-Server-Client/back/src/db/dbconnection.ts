import { WordSchema } from "./schema.ts";
import { MongoClient } from "npm:mongodb@5";

const client = new MongoClient("mongodb://mongo:27017");

await client.connect();
console.log("DB CONNECTED");
export const db = client.db("WordList");
export const wordsCollection = db.collection<WordSchema>("Contacts");
