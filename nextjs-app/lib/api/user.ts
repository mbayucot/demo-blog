import { apiAxios } from "../utils/axios-instance";

import { User } from "../types/user";

const UserAPI = {
  createOrUpdateUser: async (user: User, accessToken: string) => {
    return apiAxios.post(`users`, user, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default UserAPI;
