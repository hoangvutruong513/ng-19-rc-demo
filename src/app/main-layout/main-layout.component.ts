import { Component, effect, inject, signal } from '@angular/core';
import { ChildOneComponent } from '../child-one/child-one.component';
import { RootService } from '../root.service';

@Component({
  selector: 'app-main-layout',
  imports: [ChildOneComponent],
  styles: `
    :host {
      border: 2px solid blue;
      display: flex;
      flex-flow: column;
      gap: 16px;
      padding: 16px 16px 16px 16px;
    }
  `,
  template: `
    <section style="display: flex; flex-flow: row; gap: 16px;">
      <button (click)="increment()">Increment test</button>
      <button (click)="incrementServiceSignal()">
        Increment root signal a
      </button>
      <button (click)="incrementTestAndRootSignals()">
        Increment both test signal and root signal
      </button>
      <button (click)="toggleContent()">
        Show Content to project to Child Component
      </button>
      <button (click)="incrementInputAndToggleContentAndRootSignal()">
        Increment test signal, root signal and Toggle Content
      </button>
    </section>
    <span>Parent Component States</span>
    <span>test: {{ test() }}</span>
    <app-child-one [testInput]="test()" [sideEffectInput]="sideEffectTest()">
      @if (showContent()) {
        <span #content>This is Content Child with {{ test() }}</span>
      }
    </app-child-one>
    <div>{{ cdrFn() }}</div>
  `,
})
export class MainLayoutComponent {
  rootService = inject(RootService);
  test = signal(10);
  sideEffectTest = signal(this.test());
  showContent = signal(true);

  a = effect(() => {
    console.log("Parent Component's view effect: log test signal", this.test());
  });

  b = effect(() =>
    console.log(
      "Parent Component's view effect: log showContent boolean",
      this.showContent(),
    ),
  );

  c = effect(() =>
    console.log(
      "Parent Component's view effect: log sideEffectTest signal",
      this.sideEffectTest(),
    ),
  );

  d = effect(() => {
    this.sideEffectTest.set(this.test() * 4);
    console.log(
      "Parent Component's view effect: setting sideEffectTest to 4 x test. Note that typically, this should be a computed signal",
      this.sideEffectTest(),
    );
  });

  increment() {
    this.test.update((val) => val + 1);
  }

  incrementServiceSignal() {
    this.rootService.incrementRootA();
  }

  toggleContent() {
    this.showContent.set(!this.showContent());
  }

  incrementTestAndRootSignals() {
    this.increment();
    this.rootService.incrementRootA();
  }

  incrementInputAndToggleContentAndRootSignal() {
    this.increment();
    this.toggleContent();
    this.rootService.a.update((val) => val + 1);
    this.rootService.resetRootRecursive();
  }

  cdrFn() {
    console.log(
      '%cParent Template refreshed/updated',
      'color:white;background-color:red;',
    );
  }
}
