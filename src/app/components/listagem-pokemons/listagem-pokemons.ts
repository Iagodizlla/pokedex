import { Component, inject } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { RouterLink } from '@angular/router';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from '../../services/poke-api-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-listagem-pokemons',
  imports: [RouterLink, AsyncPipe, CardPokemon],
  templateUrl: './listagem-pokemons.html',
})

export class ListagemPokemons {
  public pokemons$?: Observable<Pokemon[]>;

 public pokemonsFavoritos$?: Observable<Pokemon[]>;

  public readonly localStorageService = inject(LocalStorageService);
  private readonly pokeApiService = inject(PokeApiService);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.pokemons$ = this.pokeApiService.selecionarPokemons();
    this.pokemonsFavoritos$ = this.localStorageService.selecionarFavoritos();
  }
}
