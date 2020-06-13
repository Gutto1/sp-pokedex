import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'type-component',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
})
export class TypeComponent implements OnInit {

  
  @Input() type: string;
  @ViewChild('container') container: ElementRef;
  
  constructor() { }

  ngOnInit() {
    console.log("type: ", this.type);
  }

  //Executado assim que todos os elementos estão renderizados na tela
  ngAfterViewInit(){
    this.container.nativeElement.classList.add(this.type);
  }

}
