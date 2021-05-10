import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

import { apiAxios } from "../../../lib/utils/axios-instance";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { accessToken } = await getAccessToken(req, res);

    await apiAxios.post(`articles`, req.body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.status(200).end();
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
    res.end();
  }
};

export default withApiAuthRequired(handler);