import { Word } from "../types.ts";
import { ObjectId } from "npm:mongodb@5";

export type WordSchema = Word & {
  _id: ObjectId;
};
