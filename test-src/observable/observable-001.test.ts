import { Observable } from "../../package/observable";

describe("observable-001.test", () => {
    test("test-01", () => {
        const teardown = jest.fn();
        const factory = jest.fn(() => teardown);

        new Observable(factory);

        expect(factory).not.toHaveBeenCalled();
        expect(teardown).not.toHaveBeenCalled();
    });

    test("test-02", () => {
        const teardown = jest.fn();
        const factory = jest.fn(() => teardown);

        const observable = new Observable(factory);

        const subscription = observable.subscribe();

        expect(factory).toHaveBeenCalled();
        expect(teardown).not.toHaveBeenCalled();

        subscription.unsubscribe();

        expect(teardown).toHaveBeenCalled();
    });
});
