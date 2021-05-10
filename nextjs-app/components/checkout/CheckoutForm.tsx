import React, { useState, FC } from "react";

import getStripe from "../../lib/utils/get-stripejs";
import { nextAxios } from "../../lib/utils/axios-instance";

import { User } from "../../lib/types/user";
import { STRIPE_PLAN } from "../../lib/utils/constants";

const CheckoutForm: FC<User> = ({ email }) => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await nextAxios.post("/api/checkout_sessions", {
      amount: STRIPE_PLAN.price.unitAmount,
      email: email,
    });

    if (response.status === 500) {
      setError(true);
      return;
    }

    const stripe = await getStripe();
    const { error: stripeError } = await stripe!.redirectToCheckout({
      sessionId: response.data.id,
    });
    if (stripeError.message) {
      setError(true);
    }
    setLoading(false);
  };

  if (error) return <div>failed to load</div>;
  if (loading) return <div>loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <p>Subscribe for unlimited article access.</p>
      <button type="submit" disabled={loading}>
        Subscribe now for ${STRIPE_PLAN.price.unitAmount}/month
      </button>
    </form>
  );
};

export default CheckoutForm;
