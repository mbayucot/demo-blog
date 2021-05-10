import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useUser } from "@auth0/nextjs-auth0";

import Layout from "../../components/Layout";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import ArticleToolbar from "../../components/article/ArticleToolbar";

const ArticlePage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { user } = useUser();
  const { data, error } = useSWR(
    slug !== undefined
      ? [`/api/articles/${slug}`.concat(!user ? `/preview` : ``)]
      : null
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <h1>{data.title}</h1>
      {user ? (
        <>
          <p>{!data.is_subscribed ? data.preview : data.body}</p>
          <ArticleToolbar {...data} />
          {!data.is_subscribed && <CheckoutForm {...user} />}
        </>
      ) : (
        <>
          <p>{data.preview}</p>
          <p>Continue reading with limited article access.</p>
          <a href="/api/auth/login">Create a free account or log in</a>
        </>
      )}
    </Layout>
  );
};

export default ArticlePage;
