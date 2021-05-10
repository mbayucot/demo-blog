import Stripe from "stripe";

export const STRIPE_PLAN = {
  mode: "subscription" as Stripe.Checkout.SessionCreateParams.Mode,
  paymentMethodTypes: [
    "card" as Stripe.Checkout.SessionCreateParams.PaymentMethodType,
  ],
  price: {
    id: "price_1IPSHxCP2UxaM2XCXH0S6jSR",
    currency: "USD",
    unitAmount: "1",
  },
  quantity: 1,
};
