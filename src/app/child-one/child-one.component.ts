import {
  ApplicationRef,
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { RootService } from '../root.service';

@Component({
  selector: 'app-child-one',
  styles: `
    :host {
      border: 2px solid green;
      padding: 16px 16px 16px 16px;
      display: flex;
      flex-flow: column;
      gap: 12px;
    }
  `,
  template: `
    <div>Child Component</div>
    <div>Computed double of testInput: {{ double() }}</div>
    <div>
      Triple of testInput, updated by child component's view effect:
      {{ triple() }}
    </div>
    <div>
      sideEffectInput, updated by parent's view effect: {{ sideEffectInput() }}
    </div>
    <div>Internal recursiveSignal: {{ recursiveSignal() }}</div>
    <section style="display: flex; flex-flow: row; gap: 16px;">
      <button (click)="toggleShowView()">Toggle Show View</button>
      <button (click)="triggerRecursiveEffectRootAndComponent()">
        Reset component and root service recursive
      </button>
      <button (click)="rootSvc.resetRootRecursive()">
        Reset root recursive
      </button>
    </section>
    @if (showView()) {
      <div
        style="border: 2px solid red; padding: 8px 8px 8px 8px ;margin-top: 16px;"
        #view
      >
        <ng-content>No content to project</ng-content>
      </div>
    }
    <div>{{ cdrFn() }}</div>
  `,
})
export class ChildOneComponent {
  rootSvc = inject(RootService);
  testInput = input<number>(0);
  sideEffectInput = input<number>(0);
  showView = signal(true);
  content = contentChild('content');
  view = viewChild('view');
  double = computed(() => this.testInput() * 2);
  triple = signal(this.testInput() * 3);
  recursiveSignal = signal(1);

  a = effect(() =>
    console.log(
      "Child Component's view effect: log testInput",
      this.testInput(),
    ),
  );

  b = effect(() =>
    console.log(
      "Child Component's view effect: log computed double of testInput",
      this.double(),
    ),
  );

  c = effect(() => {
    this.triple.set(this.testInput() * 3);
    console.log(
      "Child Component's view effect: setting triple signal to 3 x testInput, then log it here",
      this.triple(),
    );
  });

  f = effect(() =>
    console.log(
      "Child Component's view effect: log sideEffectInput. Verify that the parent's effect updated it before the child receive it",
      this.sideEffectInput(),
    ),
  );

  h = effect(() =>
    console.log(
      "Child Component's view effect: log showView signal",
      this.showView(),
    ),
  );

  e = effect(() =>
    console.log(
      "Child Component's view effect: log contentChild",
      this.content(),
    ),
  );

  g = effect(() =>
    console.log("Child Component's view effect: log viewChild", this.view()),
  );

  d = effect(() => {
    const recursiveValue = this.recursiveSignal();
    if (recursiveValue % 5 !== 0) {
      console.log("Child Component's view effect: triggering itself until 4", {
        recursiveValue,
      });
      this.recursiveSignal.update((val) => val + 1);
    }
  });

  cdrFn() {
    console.log(
      '%cChild Template refreshed/updated',
      'color:white;background-color:blue;',
    );
  }

  toggleShowView() {
    this.showView.set(!this.showView());
  }

  triggerRecursiveEffectRootAndComponent() {
    this.recursiveSignal.set(1);
    this.rootSvc.resetRootRecursive();
  }
}
