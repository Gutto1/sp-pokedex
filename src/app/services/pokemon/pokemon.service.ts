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


  //public functions
  public async getPokemon(value: string){
    return await this.api.get("pokemon", value)
      .then(res => this.formatResult(res))
      .catch(err => Promise.reject(err));
  }

  public async getDescription(value: string){
    return await this.api.get("pokemon-species", value)
      .then(res => this.formatDescription(res))
      .catch(err => Promise.reject(err))
  }



  //private functions
  private formatResult(res){
      let pokemon: Pokemon;
      let types: Array<Type>;

    types = res.types.map(i =>{
        return {slot: i.slot, name: i.type.name}
    })

    pokemon = new Pokemon(res.id,res.name,types,res.sprites)

    return pokemon;
  }

  private formatDescription(res){
    if(res && res.flavor_text_entries.length > 0){

      let retorno = res.flavor_text_entries.map(i => {
        if (i.language.name === 'en'){
          return i;
        }
      });

      retorno = retorno.filter( i => i)

      
      return retorno[0].flavor_text.replace(""," ")
    }
    return ""
  }

}
