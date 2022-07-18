import { Subscriber } from "./subscriber";
import { Subscription } from "./subscription";

export type SubscriberSource<T> =
    | Subscriber<T>["next"]
    | Partial<Subscriber<T>>;

export interface Subscribable<T> {
    subscribe(subscriber?: SubscriberSource<T>): Subscription;
}
