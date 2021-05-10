import { Comment } from "./comment";
import { User } from "./user";

export type Reaction =
  | "thumb"
  | "like"
  | "love"
  | "haha"
  | "wow"
  | "sad"
  | "angry";

type Options = {
  [key: number]: Reaction;
};

export const voteWeights: Options = {
  0: "thumb",
  1: "like",
  2: "love",
  3: "haha",
  4: "wow",
  5: "sad",
  6: "angry",
};

export interface Article {
  id: number;
  title: string;
  slug: string;
  author: User;
  tag_list: string[];
  preview: number;
  comments: Comment[];
  comments_count: number;
  created_at_fmt: string;
  is_subscribed?: boolean;
  body?: string;
  vote_weight: number;
}
