# rxjs-nano

![test: passed](https://raw.githubusercontent.com/rxjs-nano/rxjs-nano/main/badges/test.svg)
![license: MIT](https://raw.githubusercontent.com/rxjs-nano/rxjs-nano/main/badges/license.svg)

## Examples

### Observable

```ts
import { Observable } from "rxjs-nano";

const observable = new Observable(({ complete }) => {
    const id = setTimeout(complete, 1000);

    return () => clearTimeout(id);
});

observable.subscribe({
    complete() {
        // ...
    },
});
```

### Event

```ts
import { Event } from "rxjs-nano";

const event = new Event<string>();

event.subscribe(console.log);
event.emit("text");
```

### Store

```ts
import { Store } from "rxjs-nano";

const store = new Store(1);

store.subscribe(console.log);
store.next(42);

console.assert(store.value === 42);
```
