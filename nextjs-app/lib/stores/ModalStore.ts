import { makeAutoObservable } from "mobx";

import { RootStore } from "./RootStore";

export class ModalStore {
  root: RootStore;
  show = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  get isModalShow() {
    return this.show;
  }

  showModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };
}
