import { Observer } from "./observer";
import { Subscriber, SubscriberSource } from "./subscriber";
import { Subscription } from "./subscription";

export class Memo<T> extends Observer<T> {
    #value?: T;

    next(value: T): void {
        this.#value = value;

        super.next(value);
    }

    subscribe(subscriber?: SubscriberSource<T>): Subscription {
        subscriber = new Subscriber<T>(subscriber);

        const subscription = super.subscribe(subscriber);

        if (typeof this.#value !== "undefined")
            (subscriber as Subscriber<T>).next(this.#value);

        return subscription;
    }
}
