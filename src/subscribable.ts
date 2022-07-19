import { SubscriberSource } from "./subscriber";
import { Subscription } from "./subscription";

export interface Subscribable<T> {
    subscribe(subscriber?: SubscriberSource<T>): Subscription;
}
