import { Memo } from "../../package/memo";

describe("memo-001", () => {
    test("test-01", () => {
        const next = jest.fn();

        const memo = new Memo<number>();

        memo.subscribe(next);

        expect(next).not.toHaveBeenCalled();

        memo.next(42);

        expect(next).toHaveBeenCalled();
    });
});
