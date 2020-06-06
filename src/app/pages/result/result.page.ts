import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/Models/pokemon';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  termo: string = ""
  pokemon: Pokemon
  
  constructor(
    protected route: ActivatedRoute,
    protected nav: NavController,
    protected pokemonService: PokemonService
  ) { 
    
    this.route.params.subscribe(res => {
      this.termo = res.termo;
    })
  }

  async ngOnInit() {
    await this.fetchPokemon();
  }

  async fetchPokemon(){
   this.pokemon = await this.pokemonService.getPokemon(this.termo);
  }

  back(){
    this.nav.pop();
  }  

}
