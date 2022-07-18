import { TeardownLogic } from "./teardown-logic";

export class Subscription {
    #teardown?: TeardownLogic;

    constructor(teardown?: TeardownLogic) {
        this.#teardown = teardown;
    }

    unsubscribe(): void {
        this.#teardown?.();

        this.#teardown = void 0;
    }
}
