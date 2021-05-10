import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

import { stripe } from "../../../lib/utils/stripe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { stripe_customer_id } = req.body;

      const { url } = await stripe.billingPortal.sessions.create({
        customer: stripe_customer_id,
        return_url: `${req.headers.origin}/account`,
      });

      res.status(200).json({ url });
    } catch (error) {
      res.status(error.status || 500).json({
        code: error.code,
        error: error.message,
      });
      res.end();
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default withApiAuthRequired(handler);
