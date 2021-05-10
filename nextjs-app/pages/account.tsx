import { NextPage } from "next";
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import Layout from "../components/Layout";
import CustomerPortal from "../components/account/CustomerPortal";

const AccountPage: NextPage = () => {
  const { data, error } = useSWR(`/api/users`);

  if (error) return <div>failed to load</div>;

  return <Layout>{data.is_subscribed && <CustomerPortal {...data} />}</Layout>;
};

export default withPageAuthRequired(AccountPage);
