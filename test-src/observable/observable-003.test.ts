import { Observable } from "../../package/observable";

describe("observable-003.test", () => {
    test("test-01", () => {
        const next = jest.fn();
        const complete = jest.fn();

        const observable = new Observable<void>(({ next, complete }) => {
            next();
            complete();
            next();
        });

        observable.subscribe({ next, complete });

        expect(next).toHaveBeenCalled();
        expect(complete).toHaveBeenCalled();

        expect(next.mock.calls.length === 1);
    });

    test("test-02", () => {
        const next = jest.fn();
        const error = jest.fn();
        const complete = jest.fn();

        const observable = new Observable<void>(({ next, error, complete }) => {
            error(null);
            next();
            complete();
        });

        observable.subscribe({ next, error, complete });

        expect(error).toHaveBeenCalled();

        expect(next).not.toHaveBeenCalled();
        expect(complete).not.toHaveBeenCalled();
    });
});
