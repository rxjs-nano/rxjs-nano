import { Store } from "../../package/store";

describe("store-001.test", () => {
    test("test-01", () => {
        const value = 42;
        const store = new Store(value);

        expect(store.value).toBe(value);
    });

    test("test-02", () => {
        const value = 42;
        const store = new Store(1);

        store.next(value);

        expect(store.value).toBe(value);
    });
});
