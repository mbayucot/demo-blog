export interface Tag {
  id: number;
  name: string;
  taggings_count: number;
}

export type SelectOptionType = { label: string; value: string | number };
