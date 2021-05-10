import { nextAxios } from "../utils/axios-instance";
import { AxiosResponse } from "axios";

import { SelectOptionType } from "../../lib/types/tag";

const TagAPI = {
  all: async (): Promise<SelectOptionType[]> => {
    const response: AxiosResponse = await nextAxios.get(`/api/tags`);
    return response.data;
  },
};

export default TagAPI;
