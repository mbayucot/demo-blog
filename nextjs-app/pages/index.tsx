import React, { useCallback } from "react";
import { NextPage } from "next";
import useSWR from "swr";
import { observer } from "mobx-react-lite";
import { Input } from "antd";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { toJS } from "mobx";

import {
  useSearchStore,
  useModalStore,
} from "../lib/providers/RootStoreProvider";

import Layout from "../components/Layout";
import NewArticleModal from "../components/article/NewArticleModal";
import ArticleListItem from "../components/article/ArticleListItem";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const modalStore = useModalStore();
  const searchStore = useSearchStore();
  const { searchParams, setQuery } = searchStore;
  const { isModalShow, showModal, closeModal } = modalStore;
  const { tag } = router.query;
  const { Search } = Input;

  const { mutate, data, error } = useSWR(() => {
    const params = toJS(searchParams);
    if (tag !== undefined) {
      return `/api/articles?tag=${tag}`;
    } else if (params !== undefined) {
      return `/api/articles?query=${params.query}`;
    }
    return `/api/articles`;
  });

  const handleCreate = () => {
    showModal();
  };

  const handleCloseModal = useCallback(
    async (refresh?: boolean) => {
      if (refresh) {
        await mutate();
      }
      closeModal();
    },
    [mutate]
  );

  const onSearch = async (value: string) => {
    setQuery(value);
    await mutate();
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Layout>
        <h1 className="text-lg">Articles</h1>

        <div className="py-4 flex justify-between">
          {!isLoading && user && (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCreate}
            >
              Add Article
            </button>
          )}

          <Search
            placeholder="Search..."
            onSearch={onSearch}
            style={{ width: 250 }}
          />
        </div>

        {data.entries.map((row: any) => (
          <ArticleListItem {...row} key={row.id} />
        ))}
      </Layout>

      {isModalShow && <NewArticleModal onHide={handleCloseModal} />}
    </>
  );
};

export default observer(HomePage);
