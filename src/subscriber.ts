import { Observer } from "./observer";

export type SubscriberSource<T> =
    | Subscriber<T>
    | Subscriber<T>["next"]
    | Partial<Subscriber<T>>;

export class Subscriber<T> {
    constructor(subscriber?: SubscriberSource<T>) {
        if (subscriber instanceof Subscriber<T>) return subscriber;

        const source: Partial<Observer<T>> =
            typeof subscriber === "function"
                ? { next: subscriber }
                : subscriber || {};

        this.next = fn(source.next);
        this.error = fn(source.error);
        this.complete = fn(source.complete);
    }

    next(value: T): void {}
    error<Error>(error: Error): void {}
    complete(): void {}
}

function fn<T extends (...args: any[]) => void>(source?: T): T {
    return typeof source === "function" ? source : ((() => {}) as any);
}
