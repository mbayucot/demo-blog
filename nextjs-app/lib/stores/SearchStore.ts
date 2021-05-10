import { makeAutoObservable } from "mobx";

import { RootStore } from "./RootStore";

export class SearchStore {
  root: RootStore;
  params = {
    query: "",
  };

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  get searchParams() {
    if (this.params.query !== "") {
      return this.params;
    }
  }

  setQuery = (query: string) => {
    this.params.query = query;
  };
}
