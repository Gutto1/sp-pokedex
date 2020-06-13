import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultPageRoutingModule } from './result-routing.module';

import { ResultPage } from './result.page';
import { TypeComponentModule } from 'src/app/components/type/type.component.module';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultPageRoutingModule,
    TypeComponentModule
  ],
  declarations: [ResultPage],
  providers: [
    TextToSpeech
  ]
})
export class ResultPageModule {}
