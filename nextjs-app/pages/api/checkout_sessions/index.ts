import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

import stripe from "../../../lib/utils/stripe";
import { STRIPE_PLAN } from "../../../lib/utils/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, slug } = req.body;
    const customer = await stripe.customers.create({
      email: email,
    });

    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        customer: customer.id,
        mode: STRIPE_PLAN.mode,
        payment_method_types: STRIPE_PLAN.paymentMethodTypes,
        line_items: [
          {
            price: STRIPE_PLAN.price.id,
            quantity: STRIPE_PLAN.quantity,
          },
        ],
        subscription_data: {
          trial_from_plan: false,
        },
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}&article=${slug}`,
        cancel_url: `${req.headers.origin}/articles/${slug}`,
      };
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
