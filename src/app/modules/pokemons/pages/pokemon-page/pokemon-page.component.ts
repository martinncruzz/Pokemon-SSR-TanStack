import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { PokemonsService } from '@pokemons/services/pokemons.service';

@Component({
  selector: 'pokemon-page',
  imports: [LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent {
  title = inject(Title);
  meta = inject(Meta);

  pokemonId = inject(ActivatedRoute).snapshot.params['id'];

  pokemonsService = inject(PokemonsService);

  pokemonQuery = this.pokemonsService.pokemonQuery;

  onPokemonIdChangeEffect = effect(() => {
    this.pokemonsService.setPokemonId(this.pokemonId);
  });

  metaTagsEffect = effect(() => {
    if (this.pokemonQuery.data()) {
      const pokemon = this.pokemonQuery.data()!;

      const pageTitle = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name
        .slice(1)
        .toLowerCase()} Page`;
      const pageDescription = `Page about ${pokemon.name
        .charAt(0)
        .toUpperCase()}${pokemon.name.slice(1).toLowerCase()}`;

      this.title.setTitle(pageTitle);
      this.meta.updateTag({
        name: 'description',
        content: pageDescription,
      });

      this.meta.updateTag({
        name: 'og:image',
        content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      });
      this.meta.updateTag({ name: 'og:title', content: pageTitle });
      this.meta.updateTag({
        name: 'og:description',
        content: pageDescription,
      });
    }
  });
}
