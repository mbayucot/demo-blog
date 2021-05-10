import React, { FC, useState } from "react";
import { AxiosResponse } from "axios";

import { nextAxios } from "../../lib/utils/axios-instance";
import { User } from "../../lib/types/user";

const CustomerPortal: FC<User> = ({ stripe_customer_id }) => {
  const [error, setError] = useState<boolean>(false);

  const redirectToCustomerPortal = async () => {
    const response: AxiosResponse = await nextAxios.post(
      "/api/stripe/create-portal-link",
      {
        stripe_customer_id,
      }
    );
    const { url, error } = response.data;
    if (error) setError(true);
    window.location.assign(url);
  };

  if (error) return <div>failed to load</div>;

  return (
    <div>
      <button onClick={redirectToCustomerPortal}>Open customer portal</button>
    </div>
  );
};

export default CustomerPortal;
