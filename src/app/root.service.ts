import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RootService {
  a = signal(4);
  b = signal(5);
  rootRecursive = signal(1);

  c = effect(() => console.log('Root effect logging a', this.a(), this.b()));

  d = effect(() =>
    console.log('Root effect logging a x b', this.a() * this.b()),
  );

  e = effect(() => {
    const recursiveValue = this.rootRecursive();
    if (recursiveValue % 5 !== 0) {
      console.log('Root effect re-triggering itself until 4', {
        recursiveValue,
      });
      this.rootRecursive.update((val) => val + 1);
    }
  });

  incrementRootA() {
    this.a.set(this.a() + 1);
  }

  resetRootRecursive() {
    this.rootRecursive.set(1);
  }
}
