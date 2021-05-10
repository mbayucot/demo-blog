import { RootStore } from "../../../lib/stores/RootStore";
import { ModalStore } from "../../../lib/stores/ModalStore";

const setup = () => {
  const rootStore = new RootStore();
  const modalStore = new ModalStore(rootStore);
  return { rootStore, modalStore };
};

describe("ModalStore", () => {
  it("should provide methods", async () => {
    const { modalStore } = setup();

    expect(modalStore.showModal).toBeInstanceOf(Function);
    expect(modalStore.closeModal).toBeInstanceOf(Function);
  });

  it("should show/hide modal", async () => {
    const { modalStore } = setup();
    expect(modalStore.isModalShow).toBeFalsy();

    modalStore.showModal();
    expect(modalStore.isModalShow).toBeTruthy();

    modalStore.closeModal();
    expect(modalStore.isModalShow).toBeFalsy();
  });
});
