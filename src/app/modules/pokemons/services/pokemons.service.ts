import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { environment } from '@environments/environment';
import {
  PokeAPIDetailResponse,
  PokeAPIListResponse,
} from '@pokemons/interfaces/poke-api.interfaces';
import { Pokemon } from '@pokemons/interfaces/pokemon.interface';
import { PokemonMapper } from '@pokemons/mappers/pokemon.mapper';

interface Pagination {
  limit?: number;
  offset?: number;
}

const BASE_URL = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class PokemonsService {
  private http = inject(HttpClient);

  pokemonId = signal<string | null>(null);
  pagination = signal<Pagination | null>(null);

  // Queries

  pokemonsQuery = injectQuery(() => ({
    queryKey: ['pokemons', this.pagination()],
    queryFn: () => this.getPokemons(this.pagination()!),
  }));

  pokemonQuery = injectQuery(() => ({
    queryKey: ['pokemon', this.pokemonId()],
    queryFn: () => this.getPokemonById(this.pokemonId()!),
    enabled: !!this.pokemonId(),
  }));

  // HTTP Requests

  getPokemons(pagination: Pagination): Promise<Pokemon[]> {
    const { limit = 20, offset = 0 } = pagination;

    return lastValueFrom(
      this.http
        .get<PokeAPIListResponse>(`${BASE_URL}`, { params: { offset, limit } })
        .pipe(map(({ results }) => results.map(PokemonMapper.fromListItem)))
    );
  }

  getPokemonById(id: string): Promise<Pokemon> {
    return lastValueFrom(
      this.http
        .get<PokeAPIDetailResponse>(`${BASE_URL}/${id}`)
        .pipe(map(PokemonMapper.fromDetailResponse))
    );
  }

  // Other methods

  setPokemonId(pokemonId: string): void {
    this.pokemonId.set(pokemonId);
  }

  setPagination(pagination: Pagination): void {
    this.pagination.set(pagination);
  }
}
