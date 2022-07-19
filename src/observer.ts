import { Observable } from "./observable";
import { Subscriber, SubscriberSource } from "./subscriber";
import { Subscription } from "./subscription";

export class Observer<T> implements Subscriber<T>, Observable<T> {
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
            a: new Subscriber<T>(subscriber),
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

interface ObserverItem<T> {
    a: Subscriber<T>;
    b: Subscription;
}
