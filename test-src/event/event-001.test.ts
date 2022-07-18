import { Event } from "../../package/event";

describe("event-001", () => {
    test("test-01", () => {
        const next = jest.fn();

        const event = new Event<void>();

        event.subscribe(next);
        event.emit();

        expect(next).toHaveBeenCalled();
    });
});
