import { Observer } from "./observer";
import { SubscriberSource } from "./subscribable";
import { Subscription } from "./subscription";

export class Memo<T> extends Observer<T> {
    #value?: T;

    next(value: T): void {
        this.#value = value;

        super.next(value);
    }

    subscribe(subscriber?: SubscriberSource<T>): Subscription {
        const subscription = super.subscribe(subscriber);

        if (typeof this.#value !== "undefined") this.next(this.#value);

        return subscription;
    }
}
