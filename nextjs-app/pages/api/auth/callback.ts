import { NextApiResponse, NextApiRequest } from "next";
import { Session } from "@auth0/nextjs-auth0";

import auth0 from "../../../lib/utils/init-auth0";
import UserAPI from "../../../lib/api/user";

const afterCallback = async (
  _req: NextApiRequest,
  _res: NextApiResponse,
  session: Session
) => {
  const {
    accessToken,
    user: { sub, email, given_name, family_name },
  } = session;

  if (accessToken) {
    await UserAPI.createOrUpdateUser(
      {
        auth0_user_id: sub.split("|")[1],
        email: email,
        first_name: given_name,
        last_name: family_name,
      },
      accessToken
    );
  }

  return session;
};

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleCallback(req, res, { afterCallback });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
};

export default callback;
