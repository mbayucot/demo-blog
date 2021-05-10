import { NextApiRequest, NextApiResponse } from "next";

import auth0 from "../../../lib/utils/init-auth0";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleLogin(req, res, {
      authorizationParams: {
        scope: process.env.AUTH0_SCOPE,
      },
    });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
};

export default login;
