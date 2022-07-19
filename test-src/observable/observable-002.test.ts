import { observable, ObservableFactory } from "../../package/observable";

describe("observable-002.test", () => {
    test("test-01", () => {
        const teardown = jest.fn();
        const complete = jest.fn();

        const factory: ObservableFactory<void> = ({ complete }) => {
            complete();

            return teardown;
        };

        observable(factory).subscribe({ complete });

        expect(complete).toHaveBeenCalled();
        expect(teardown).toHaveBeenCalled();
    });

    test("test-02", () => {
        const teardown = jest.fn();
        const complete = jest.fn();

        observable(() => teardown)
            .subscribe({ complete })
            .unsubscribe();

        expect(teardown).toHaveBeenCalled();
        expect(complete).not.toHaveBeenCalled();
    });
});
