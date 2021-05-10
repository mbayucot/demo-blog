export type Comment = {
  id: number;
  article_id: number;
  body: string;
  children: Comment[];
};

export interface Comments {
  article_id: number;
  children: Comment[];
  count?: number;
}
