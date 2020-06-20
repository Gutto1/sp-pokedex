import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/Models/pokemon';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Gesture, createGesture, createAnimation, Animation } from '@ionic/core'

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
  gesture: Gesture;
  animationDuration: number = 795;

  @ViewChild('container') container: ElementRef
  @ViewChild('holder') holder: ElementRef

  constructor(
    protected route: ActivatedRoute,
    protected nav: NavController,
    protected pokemonService: PokemonService,
    protected tts: TextToSpeech,
    protected zone: NgZone
  ) {

    this.route.params.subscribe(res => {
      this.termo = res.termo.toLowerCase();
    })
  }

  async ngOnInit() {
    await this.fetchPokemon();


    this.gesture = createGesture({
      el: this.container.nativeElement,
      gestureName: 'swipe',
      threshold: 20,
      onStart: (ev) => this.onStart(ev)
    })

    this.gesture.enable(true);

    
  }

  onStart(ev) {
    ev.deltaX < 0 ? this.nextPokemon() : this.previousPokemon()
  }

  async previousPokemon() {
    this.tts.stop()
    this.termo = (this.pokemon.id - 1).toString()
    this.playAnimation('prev')
  }

  async nextPokemon(){
    this.tts.stop()
    this.termo = (this.pokemon.id + 1).toString()
    this.playAnimation('next')
  }

  playAnimation(direction){
    let from = "";
    let to = "";

    if(direction === 'next'){
      from = '150%'
      to = '-150%'
    }else{
      from = '-150%'
      to = '150%'
    }

    const animation: Animation = createAnimation('move')
      .addElement(this.holder.nativeElement)
      .duration(this.animationDuration)
      .fromTo('left',from,to)

    animation.play()
    setTimeout(() => {
      this.fetchPokemon()  
    }, this.animationDuration * 0.46);
    
  }

  async fetchPokemon() {

    try {
      await this.pokemonService.getPokemon(this.termo)
        .then(res =>{
          this.zone.run(() =>{
            this.pokemon = res;
          })
        })
      
        await this.pokemonService.getDescription(this.termo)
        .then(res =>{
          this.zone.run(() => {
            this.flavor_text = res;
          })
        })

    } catch (err) {
      if (err.status === 404) {
        this.notFound = true
        this.gesture.enable(false);
      }
    }

    this.loading = false;

    this.tts.speak({
      text: `${this.pokemon.name}. ${this.flavor_text}`,
      locale: 'en-US'
    });
    
    console.log('pokemon: ', this.pokemon)
  }

  back() {
    this.nav.pop();
  }

  ngOnDestroy() {
    this.gesture.destroy();
  }

}
