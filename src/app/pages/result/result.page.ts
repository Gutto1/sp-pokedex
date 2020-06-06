import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  termo: string = ""
  
  constructor(
    protected route: ActivatedRoute,
    protected nav: NavController
  ) { 
    
    this.route.params.subscribe(res => {
      this.termo = res.termo;
    })
  }

  ngOnInit() {
    console.log("Termo de busca: ", this.termo);
  }

  back(){
    this.nav.pop();
  }  

}
