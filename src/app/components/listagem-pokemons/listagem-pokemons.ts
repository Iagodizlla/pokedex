import { Component, inject } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { RouterLink } from '@angular/router';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { alternarStatusPokemon, pokemonsFavoritos } from '../../util/pokemons-favoritos';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from '../../services/poke-api-service';

@Component({
  selector: 'app-listagem-pokemons',
  imports: [CardPokemon, RouterLink],
  templateUrl: './listagem-pokemons.html',
})

export class ListagemPokemons {
  public pokemons: Pokemon[] = [];

  public pokemonsFavoritos = pokemonsFavoritos;
  public alternarStatusPokemon = alternarStatusPokemon;

  private readonly pokeApiService = inject(PokeApiService);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

     this.pokemons = this.pokeApiService.selecionarPokemons();
  }
}
