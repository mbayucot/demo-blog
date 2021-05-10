import { SearchStore } from "./SearchStore";
import { ModalStore } from "./ModalStore";

export class RootStore {
  modalStore: ModalStore;
  searchStore: SearchStore;

  constructor() {
    this.searchStore = new SearchStore(this);
    this.modalStore = new ModalStore(this);
  }
}
