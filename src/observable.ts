import { Observer } from "./observer";
import { Subscription } from "./subscription";
import { TeardownLogic } from "./teardown-logic";

export interface Subscriber<T> {
    next: Observer<T>["next"];
    error: Observer<T>["error"];
    complete: Observer<T>["complete"];
}

export interface ObservableFactory<T> {
    (subscriber: Subscriber<T>): Subscription | TeardownLogic | void;
}

export class Observable<T> {
    #factory: ObservableFactory<T>;

    constructor(factory: ObservableFactory<T>) {
        this.#factory = factory;
    }

    subscribe(
        subscriber?: Parameters<Observer<T>["subscribe"]>[0],
    ): Subscription {
        const observer = new Observer<T>();
        const observerSubscription = observer.subscribe(subscriber);

        const teardownSource = this.#factory({
            next(value) {
                observer.next(value);
            },
            error(error) {
                observer.error(error);
            },
            complete() {
                observer.complete();
            },
        });

        const teardown = pickTeardown(teardownSource) || (() => {});
        const subscription = new Subscription(() => {
            observerSubscription.unsubscribe();

            teardown();
        });

        if (observer.closed) subscription.unsubscribe();

        return subscription;
    }
}

function pickTeardown<T>(
    source: ReturnType<ObservableFactory<T>>,
): TeardownLogic | undefined {
    if (typeof source === "function") return source;
    if (source instanceof Subscription) return source.unsubscribe.bind(source);
}
