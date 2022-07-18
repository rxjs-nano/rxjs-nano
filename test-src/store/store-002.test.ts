import { Store } from "../../package/store";

describe("store-002.test", () => {
    test("test-01", () => {
        const value = 42;
        const store = new Store(value);

        const next = jest.fn();

        store.subscribe(next);

        const { calls } = next.mock;

        expect(next.mock.calls.length).toBe(1);

        const [[actualValue]] = calls;

        expect(actualValue).toBe(value);
    });
});
