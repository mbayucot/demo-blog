import { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../../lib/utils/init-auth0";

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleProfile(req, res);
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
};

export default me;
