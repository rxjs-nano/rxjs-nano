import { Observer } from "./observer";

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
}
