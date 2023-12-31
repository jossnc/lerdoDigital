import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import {
  AlertController,
  IonicSafeString,
  LoadingController,
  NavController 
} from '@ionic/angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!:string;
  @Input() backButton!:string;
  @Input() isModal!:string;
  @Input() MenuButton!:string;
  @Input() shouldShowHorizontalMenu!:string;
  @Input() Logo!:string;
  @Input() Manual!:string;


  constructor( private utilsSvc: UtilsService,private authService: AuthService, private AlertController: AlertController,
    public LoadingController: LoadingController,) { }

  async  ngOnInit() {
    

  }

  async ayuda() { 
    const loading = await this.LoadingController.create({
        cssClass: 'my-custom-class',
        message: 'descargando manual...'
    });
    await loading.present();

    let resp: any;
    let data: any;

    data = await this.authService.getmanualfacturacion();

    await data.forEach(element => {
        resp = element;
    });

    if ( resp.codigo > 0) { 
         var link = document.createElement("a"); 
         link.href = "data:application/pdf;base64,"+resp.PDF; 
         link.download = "facturacion_LerdoDigital.pdf";
         link.click();
        //var pdfAsDataUri = "data:application/pdf;base64,"+resp.PDF;
        //window.open(pdfAsDataUri);

        const alert = await this.AlertController.create({
            cssClass: 'not_found_alert',
            header: 'LERDO DIGITAL',
            message: 'El manual se descargo correctamente.',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        await alert.present();
    } else {
        const alert = await this.AlertController.create({
            cssClass: 'not_found_alert',
            header: 'LERDO DIGITAL',
            message: 'No se pudo descargar el manual, favor de intentarlo nuevamente.',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        await alert.present();
    }
    loading.dismiss();
}


    dismissModal(){
    this.utilsSvc.dismissModal()
  }

  }