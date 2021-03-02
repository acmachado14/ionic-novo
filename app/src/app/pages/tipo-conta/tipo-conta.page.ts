import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-tipo-conta',
  templateUrl: './tipo-conta.page.html',
  styleUrls: ['./tipo-conta.page.scss'],
})
export class TipoContaPage implements OnInit {
  user: any;
  tiposContas: any = [];
  constructor(protected titleService: Title, protected navController: NavController) {
    this.titleService.setTitle('Tipo Contas');
  }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('loginBD'))){
      this.user = JSON.parse(localStorage.getItem('loginBD'));
    }else{
      this.navController.navigateBack("/login");
    }

    this.tiposContas = JSON.parse(localStorage.getItem('tipoBD'));
  }

}
