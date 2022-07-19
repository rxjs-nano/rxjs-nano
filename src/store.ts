import { Observer } from "./observer";
import { Subscriber, SubscriberSource } from "./subscriber";
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
        subscriber = new Subscriber<T>(subscriber);

        const subscription = super.subscribe(subscriber);

        (subscriber as Subscriber<T>).next(this.#value);

        return subscription;
    }
}
