import { RootStore } from "../../../lib/stores/RootStore";
import { SearchStore } from "../../../lib/stores/SearchStore";

const setup = () => {
  const rootStore = new RootStore();
  const searchStore = new SearchStore(rootStore);
  const searchText = "searchText";
  return { rootStore, searchStore, searchText };
};

describe("SearchStore", () => {
  it("should provide methods", async () => {
    const { searchStore } = setup();
    expect(searchStore.setQuery).toBeInstanceOf(Function);
  });

  it("should set params", async () => {
    const { searchStore, searchText } = setup();
    expect(searchStore.params).toStrictEqual({ query: "" });

    searchStore.setQuery(searchText);
    expect(searchStore.searchParams).toStrictEqual({
      query: searchText,
    });
  });
});
