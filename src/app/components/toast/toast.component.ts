import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent{

  constructor(
    public toastController: ToastController
  ) { }

  public async showToast(msg: string, duration?: number){
    
    const toast = await this.toastController.create({
      message: msg ? msg : "Erro desconhecido!",
      duration: duration ? duration : 2000
    });
    toast.present();
  }

}
