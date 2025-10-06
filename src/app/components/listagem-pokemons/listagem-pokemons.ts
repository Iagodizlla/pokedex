import { Component } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { converterParaTitleCase } from '../../util/converter-parap-title-case';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { alternarStatusPokemon, pokemonsFavoritos } from '../../util/pokemons-favoritos';
import { PokeApiDetailsResponse, PokeApiResponse } from '../../models/poke-api';

@Component({
  selector: 'app-listagem-pokemons',
  imports: [CardPokemon, RouterLink],
  templateUrl: './listagem-pokemons.html',
})

export class ListagemPokemons {
  public pokemons: Pokemon[] = [];

  public pokemonsFavoritos = pokemonsFavoritos;
  public alternarStatusPokemon = alternarStatusPokemon;

  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get<PokeApiResponse>(this.url).subscribe((obj) => {
      const arrayResultados: { name: string; url: string }[] = obj.results;

      for (const resultado of arrayResultados) {
        this.http.get<PokeApiDetailsResponse>(resultado.url).subscribe((objDetalhes) => {
          const pokemon = this.mapearPokemon(objDetalhes);

          this.pokemons.push(pokemon);
        });
      }
    });
  }

  private mapearPokemon(obj: PokeApiDetailsResponse): Pokemon {

    return {
      id: obj.id,
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      tipos: obj.types.map((x) => converterParaTitleCase(x.type.name)),
      favorito: pokemonsFavoritos.some((x) => x.id == obj.id),
    };
  }
}
