import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import { SWRConfig } from "swr";
import qs from "qs";
import type { AppProps } from "next/app";

import { RootStoreProvider } from "../lib/providers/RootStoreProvider";
import { nextAxios } from "../lib/utils/axios-instance";

import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { user } = pageProps;

  return (
    <SWRConfig
      value={{
        fetcher: (resource, params) =>
          nextAxios
            .get(resource, {
              params: params,
              paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: "brackets" });
              },
            })
            .then((res) => res.data),
      }}
    >
      <RootStoreProvider>
        <UserProvider user={user}>
          <Component {...pageProps} />
        </UserProvider>
      </RootStoreProvider>
    </SWRConfig>
  );
};

export default MyApp;
