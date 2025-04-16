import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { PaginationService } from '@shared/services/pagination.service';
import { PokemonListComponent } from '@pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsService } from '@pokemons/services/pokemons.service';

@Component({
  selector: 'pokemons-page',
  imports: [
    RouterLink,
    PokemonListComponent,
    ErrorMessageComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  title = inject(Title);
  meta = inject(Meta);

  paginationService = inject(PaginationService);
  pokemonsService = inject(PokemonsService);

  pokemonsQuery = this.pokemonsService.pokemonsQuery;

  onPageChangeEffect = effect(() => {
    this.pokemonsService.setPagination({
      offset: (this.paginationService.currentPage() - 1) * 9,
    });
  });

  metaTagsEffect = effect(() => {
    this.title.setTitle(`Pokemons Page`);
    this.meta.updateTag({
      name: 'description',
      content: 'Explore all the pokemons in our website',
    });

    this.meta.updateTag({
      name: 'og:image',
      content: `https://res.cloudinary.com/dhhxe6sif/image/upload/v1743279154/SSR-Angular/cinptgg2jfaq9talgmkx.png`,
    });
  });
}
