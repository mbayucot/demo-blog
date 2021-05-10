import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import Layout from "../components/Layout";

const ResultPage: NextPage = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null
  );

  if (error) return <div>failed to load</div>;

  return (
    <Layout>
      <div>
        <h2>{data?.payment_intent?.status ?? "loading..."}</h2>
        {data?.payment_intent?.status === "succeeded" ? (
          <div>
            <h2>Thank you for subscribing!</h2>
            <Link as={`/articles/${router.query.slug}`} href="/articles/[slug]">
              <a>Return to article</a>
            </Link>
          </div>
        ) : (
          <h2>
            We were unable to process your credit card payment. If the problem
            persists, contact us to complete your order.
          </h2>
        )}
      </div>
    </Layout>
  );
};

export default withPageAuthRequired(ResultPage);
