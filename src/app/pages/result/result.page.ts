import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/Models/pokemon';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  termo: string = "";
  pokemon: Pokemon;
  loading: boolean = true;
  flavor_text: string = "";
  notFound: boolean = false;
  
  constructor(
    protected route: ActivatedRoute,
    protected nav: NavController,
    protected pokemonService: PokemonService,
    protected tts: TextToSpeech
  ) { 
    
    this.route.params.subscribe(res => {
      this.termo = res.termo.toLowerCase();
    })
  }

  async ngOnInit() {
    await this.fetchPokemon();
    this.tts.speak({
      text: `${this.pokemon.name}. ${this.flavor_text}`,
      locale: 'en-US'
    });
  }

  async fetchPokemon(){
    try{
      this.pokemon = await this.pokemonService.getPokemon(this.termo);
      this.flavor_text = await this.pokemonService.getDescription(this.termo);
    }catch(err){
      if(err.status === 404){
        this.notFound = true
      }
    }
   this.loading = false;
  }

  back(){
    this.nav.pop();
  }  

}
