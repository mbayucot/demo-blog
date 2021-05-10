import React, { useContext } from "react";
import { renderHook } from "@testing-library/react-hooks";

import { ModalStore } from "../../../lib/stores/ModalStore";
import { SearchStore } from "../../../lib/stores/SearchStore";
import {
  RootStoreProvider,
  StoreContext,
} from "../../../lib/providers/RootStoreProvider";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RootStoreProvider>{children}</RootStoreProvider>
);

const setup = () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useContext(StoreContext),
    { wrapper }
  );
  return { result, waitForNextUpdate };
};

describe("RootStoreProvider", () => {
  it("should provide the store", async () => {
    const { result } = setup();
    expect(result.current).toBeDefined();
    expect(result.current?.modalStore).toBeInstanceOf(ModalStore);
    expect(result.current?.searchStore).toBeInstanceOf(SearchStore);
  });
});
