# rxjs-nano

![test: passed](https://raw.githubusercontent.com/rxjs-nano/rxjs-nano/main/badges/test.svg)
![license: MIT](https://raw.githubusercontent.com/rxjs-nano/rxjs-nano/main/badges/license.svg)

## API

### Observable

The Observable type is an interface. To instantiate an Observable use a function `observable`.

```ts
import { observable, Observable } from "rxjs-nano";

const second: Observable<void> = observable(({ complete }) => {
    const id = setTimeout(complete, 1000);

    return () => clearTimeout(id);
});

observable.subscribe({
    complete() {
        // ...
    },
});
```

Every types implements an Observable.

```ts
import { Event, Memo, observable, Observable, Store } from "rxjs-nano";

const observableA: Observable<number> = observable(({ next, complete }) => {
    next(1);
    complete();
});
const observableB: Observable<number> = new Event();
const observableC: Observable<number> = new Memo();
const observableD: Observable<number> = new Store(1);
```

### Event

An Event is the same as an RxJS Subject

```ts
import { Event } from "rxjs-nano";

const event = new Event<string>();

event.subscribe(console.log);
event.emit("text");
```

### Store

A Store is the same as an RxJS BehaviorSubject

```ts
import { Store } from "rxjs-nano";

const store = new Store(1);

store.subscribe(console.log);
store.next(42);

console.assert(store.value === 42);
```

### Memo

A Memo is between of an Event and a Store. It store a value, but hasn't an initial value and hasn't an value accessor.

```ts
import { Memo } from "rxjs-nano";

const data = new Memo();

data.subscribe((value) => {
    // called after an initial value has been emitted
    console.log("observerA:", value);
});

data.next(1);

data.subscribe((value) => {
    // a value has been emitted so this handler called immediately
    console.log("observerB:", value);
});
```
