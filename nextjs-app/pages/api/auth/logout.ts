import { NextApiResponse, NextApiRequest } from "next";

import auth0 from "../../../lib/utils/init-auth0";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleLogout(req, res);
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
};

export default logout;
