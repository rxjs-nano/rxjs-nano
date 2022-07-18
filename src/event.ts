import { Observer } from "./observer";

export class Event<T> extends Observer<T> {
    emit(value: T): void {
        this.next(value);
    }
}
