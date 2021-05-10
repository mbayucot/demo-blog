import React, { createContext, ReactNode, useContext } from "react";

import { RootStore } from "../stores/RootStore";

let store: RootStore;
export const StoreContext = createContext<RootStore | undefined>(undefined);

export function useRootStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }

  return context;
}

export function useModalStore() {
  const { modalStore } = useRootStore();
  return modalStore;
}

export function useSearchStore() {
  const { searchStore } = useRootStore();
  return searchStore;
}

export function RootStoreProvider({ children }: { children: ReactNode }) {
  const root = store ?? new RootStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}
