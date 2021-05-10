import { NextApiRequest, NextApiResponse } from "next";

import { apiAxios } from "../../../lib/utils/axios-instance";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { query, tag },
    } = req;

    const response = await apiAxios.get(`articles`, {
      params: {
        query,
        tag,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.status || 500).end(error.message);
    res.end();
  }
};

export default handler;
