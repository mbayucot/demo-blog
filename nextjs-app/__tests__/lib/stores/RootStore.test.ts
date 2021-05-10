import { RootStore } from "../../../lib/stores/RootStore";
import { ModalStore } from "../../../lib/stores/ModalStore";
import { SearchStore } from "../../../lib/stores/SearchStore";

const setup = () => {
  const rootStore = new RootStore();
  return { rootStore };
};

describe("RootStore", () => {
  it("should set params", async () => {
    const { rootStore } = setup();

    expect(rootStore.modalStore).toBeInstanceOf(ModalStore);
    expect(rootStore.searchStore).toBeInstanceOf(SearchStore);
  });
});
