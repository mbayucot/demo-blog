import { nextAxios } from "../utils/axios-instance";

import { voteWeights } from "../types/article";

const ArticleAPI = {
  like: async (slug: string, reaction: string) => {
    const voteWeight = Object.keys(voteWeights).find(
      (key) => voteWeights[(key as unknown) as number] === reaction
    );

    return nextAxios.patch(`/api/articles/${slug}/like`, {
      weight: voteWeight,
    });
  },

  unlike: async (slug: string) => {
    return await nextAxios.patch(`/api/articles/${slug}/unlike`);
  },
};

export default ArticleAPI;
