import { Subscribable, SubscriberSource } from "./subscribable";
import { Subscriber } from "./subscriber";
import { Subscription } from "./subscription";

export class Observer<T> implements Subscribable<T> {
    get closed() {
        return this.#closed;
    }

    #closed = false;
    #items = new Set<ObserverItem<T>>();

    next(value: T): void {
        if (this.#closed) return;

        this.#getCallbacks("next").forEach((next) => next(value));
    }

    error<Error>(error: Error): void {
        if (this.#closed) return;

        const errorbacks = this.#getCallbacks("error");

        this.#teardown();

        errorbacks.forEach((errorback) => errorback(error));
    }

    complete(): void {
        if (this.#closed) return;

        const callbacks = this.#getCallbacks("complete");

        this.#teardown();

        callbacks.forEach((callback) => callback());
    }

    subscribe(subscriber?: SubscriberSource<T>): Subscription {
        const item: ObserverItem<T> = {
            a: createSubscriber<T>(subscriber),
            b: new Subscription(() => {
                this.#items.delete(item);

                this.#teardown();
            }),
        };

        this.#items.add(item);

        return item.b;
    }

    #getCallbacks<Key extends keyof Subscriber<T>>(
        key: Key,
    ): Subscriber<T>[Key][] {
        return Array.from(this.#items).map(({ a }) => a[key]);
    }

    #teardown(): void {
        this.#closed = true;

        this.#items.forEach(({ b }) => b.unsubscribe());
        this.#items.clear();
    }
}

function createSubscriber<T>(
    observer: Parameters<Observer<T>["subscribe"]>[0],
): Subscriber<T> {
    const source: Partial<Observer<T>> =
        typeof observer === "function" ? { next: observer } : observer || {};

    return {
        next: fn(source.next),
        error: fn(source.error),
        complete: fn(source.complete),
    };
}

function fn<T extends (...args: any[]) => void>(source?: T): T {
    return typeof source === "function" ? source : ((() => {}) as any);
}

interface ObserverItem<T> {
    a: Subscriber<T>;
    b: Subscription;
}
