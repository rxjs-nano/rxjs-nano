import { Observable } from "../../package/observable";

describe("observable-002.test", () => {
    test("test-01", () => {
        const teardown = jest.fn();
        const complete = jest.fn();

        const observable = new Observable(({ complete }) => {
            complete();

            return teardown;
        });

        observable.subscribe({ complete });

        expect(complete).toHaveBeenCalled();
        expect(teardown).toHaveBeenCalled();
    });

    test("test-02", () => {
        const teardown = jest.fn();
        const complete = jest.fn();

        const observable = new Observable(() => teardown);

        observable.subscribe({ complete }).unsubscribe();

        expect(teardown).toHaveBeenCalled();
        expect(complete).not.toHaveBeenCalled();
    });
});
