import { Component, OnInit } from '@angular/core';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  termo: string = ""
  toast: ToastComponent
  constructor(
    protected toastCtrl: ToastController,
    protected router: Router
  ) { }

  ngOnInit(){
    this.toast = new ToastComponent(this.toastCtrl);
  }

  async buscar(){
    if(!this.termo){
      await this.toast.showToast("Informe um termo de busca!", 1500);
      console.error("Informe um termo de busca!");
      return;
    }

    this.router.navigate(["/result", {termo: this.termo}]);
  }
}
