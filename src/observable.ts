import { Observer } from "./observer";
import { Subscriber, SubscriberSource } from "./subscriber";
import { Subscription } from "./subscription";
import { TeardownLogic } from "./teardown-logic";

export interface Observable<T> {
    subscribe(subscriber?: SubscriberSource<T>): Subscription;
}

export interface ObservableFactory<T> {
    (subscriber: Subscriber<T>): Subscription | TeardownLogic | void;
}

export function observable<T>(factory: ObservableFactory<T>): Observable<T> {
    return {
        subscribe(subscriber?: SubscriberSource<T>): Subscription {
            const observer = new Observer<T>();
            const observerSubscription = observer.subscribe(subscriber);

            const teardownSource = factory({
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
        },
    };
}

function pickTeardown<T>(
    source: ReturnType<ObservableFactory<T>>,
): TeardownLogic | undefined {
    if (typeof source === "function") return source;
    if (source instanceof Subscription) return source.unsubscribe.bind(source);
}
