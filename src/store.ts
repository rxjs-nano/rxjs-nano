import { Subscriber } from "./observable";
import { Observer } from "./observer";
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

    subscribe(
        subscriber?: ((value: T) => void) | Partial<Subscriber<T>> | undefined,
    ): Subscription {
        const subscription = super.subscribe(subscriber);

        this.next(this.#value);

        return subscription;
    }
}
