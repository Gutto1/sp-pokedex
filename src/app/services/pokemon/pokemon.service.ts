import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Pokemon } from 'src/app/Models/pokemon';
import { Type } from 'src/app/Models/type';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    protected api: ApiService
  ) { }


  public async getPokemon(value: string){
    return await this.api.get("pokemon", value)
      .then(res => this.formatResult(res))
      .catch(err => Promise.reject(err));
  }



  private formatResult(res){
      console.log(res);
      let pokemon: Pokemon;
      let types: Array<Type>;

    types = res.types.map(i =>{
        return {slot: i.slot, name: i.type.name}
    })

    pokemon = new Pokemon(res.id,res.name,types,res.sprites)

    return pokemon;
  }

}
