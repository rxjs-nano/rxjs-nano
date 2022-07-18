import { Observer } from "./observer";
import { SubscriberSource } from "./subscribable";
import { Subscription } from "./subscription";

export class Store<T> extends Observer<T> {
    get value() {
        return this.#value;
    }

    #value: T;

    constructor(initial: T) {
        super();

        this.#value = initial;
    }

    next(value: T): void {
        this.#value = value;

        super.next(value);
    }

    subscribe(subscriber?: SubscriberSource<T>): Subscription {
        const subscription = super.subscribe(subscriber);

        this.next(this.#value);

        return subscription;
    }
}
