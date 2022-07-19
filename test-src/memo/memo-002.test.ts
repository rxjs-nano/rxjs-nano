import { Memo } from "../../package/memo";

describe("memo-002", () => {
    test("test-01", () => {
        const memo = new Memo<number>();
        const next = jest.fn();

        memo.subscribe(next);

        const firstValue = 1;

        memo.next(firstValue);

        const nextValue = 42;

        memo.next(nextValue);

        expect(next.mock.calls.length).toBe(2);
        expect(next.mock.calls[0][0]).toBe(firstValue);
        expect(next.mock.calls[1][0]).toBe(nextValue);
    });
});
