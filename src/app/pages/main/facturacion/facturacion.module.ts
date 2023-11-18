import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturacionPageRoutingModule } from './facturacion-routing.module';

import { FacturacionPage } from './facturacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturacionPageRoutingModule
  ],
  declarations: [FacturacionPage]
})
export class FacturacionPageModule {}
