import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

import { apiAxios } from "../../../lib/utils/axios-instance";
import { Tag, SelectOptionType } from "../../../lib/types/tag";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { accessToken } = await getAccessToken(req, res);

    const response = await apiAxios.get(`tags`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = response.data.map(
      (tag: Tag) =>
        ({
          value: tag.id,
          label: tag.name,
        } as SelectOptionType)
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
    res.end();
  }
};

export default withApiAuthRequired(handler);
