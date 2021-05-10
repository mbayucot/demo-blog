import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

import { apiAxios } from "../../../../lib/utils/axios-instance";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const {
      query: { slug },
    } = req;

    const response = await apiAxios.get(`articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
    res.end();
  }
};

export default withApiAuthRequired(handler);
