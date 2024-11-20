import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  computed,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Pokemon {
  abilities: PokemonAbility[];
  base_experience: number;
}

@Component({
  selector: 'app-link-signal-demo',
  imports: [JsonPipe],
  template: `
    @let driverValue = driver();
    <div style="display: flex; flex-flow: column; gap: 16px;">
      <div>driver: {{ driverValue }}</div>
      <div>linked1 {{ linked1() }}</div>
      <div>linked2 {{ linked2() }}</div>
      <div>linked3 {{ linked3() }}</div>
      <div style="display: flex; flex-flow: row; gap: 16px;">
        <button (click)="incrementDriver()">Increment driver</button>
        <button (click)="decrementDriver()">Decrement driver</button>
        <button (click)="incrementLinked1()">Increment linked1</button>
        <button (click)="incrementLinked2()">Increment linked2</button>
        <button (click)="incrementLinked3()">Increment linked3</button>
      </div>
      @if (pokemon.isLoading()) {
        <div>...Loading</div>
      } @else {
        <pre>{{ pokemonBaseExperience() | json }}</pre>
        <pre>{{ pokemon.value() | json }}</pre>
      }
      @if (pokemon.error()) {
        <div>wtf???</div>
      } 
    </div>
  `,
  styles: ``,
})
export class LinkSignalDemoComponent {
  baseUrl = 'https://pokeapi.co/api/v2/';
  
  driver = signal(1);

  linked1 = linkedSignal(() => this.driver() * 10);

  http = inject(HttpClient);
  
  pokemon = resource({
    request: this.driver,
    loader: () =>
      lastValueFrom(
        this.http.get<Pokemon>(`${this.baseUrl}pokemon/${this.driver()}`),
      ),
  });

  pokemonBaseExperience = computed(
    () => this.pokemon.value()?.base_experience ?? 0,
  );

  linked2 = linkedSignal(() => this.pokemonBaseExperience());

  linked3 = linkedSignal({
    source: this.pokemonBaseExperience,
    computation: (source) => {
      return source * 5;
    },
  });

  incrementDriver() {
    this.driver.update((v) => v + 1);
  }

  decrementDriver() {
    this.driver.update((v) => v - 1);
  }

  incrementLinked1() {
    this.linked1.update((v) => v + 2);
  }

  incrementLinked2() {
    this.linked2.update((v) => v + 3);
  }

  incrementLinked3() {
    this.linked3.update((v) => (v as number) + 4);
  }
}
