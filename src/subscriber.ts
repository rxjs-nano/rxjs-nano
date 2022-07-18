import { Observer } from "./observer";

export interface Subscriber<T> {
    next: Observer<T>["next"];
    error: Observer<T>["error"];
    complete: Observer<T>["complete"];
}
