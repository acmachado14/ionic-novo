import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {NavController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: any;
  tipos: any = [];

  tipo = {
    nomeTipo: null
  }

  tipoConta = new FormGroup({
    tipo: new FormControl('', Validators.required),
  });
  constructor(protected titleService: Title, protected navController: NavController, protected toastController: ToastController) {
    this.titleService.setTitle('Novo Tipo Conta');
  }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('loginBD'))){
      this.user = JSON.parse(localStorage.getItem('loginBD'));
    }else{
      this.navController.navigateBack("/login");
    }

    this.tipos = JSON.parse(localStorage.getItem('tipoBD'));
    if(!this.tipos){
      this.tipos = [];
      localStorage.setItem('tipoBD', JSON.stringify(this.tipos));
    }


    this.tipoConta.get('tipo').setValue(this.tipo.nomeTipo);
  }

  salvarTipo() {
    this.tipo.nomeTipo = this.tipoConta.value.tipo;

    this.tipos = JSON.parse(localStorage.getItem('tipoBD'));

    this.tipos.push(this.tipo);

    localStorage.setItem('tipoBD', JSON.stringify(this.tipos));
    this.exibirMensagem('Tipo de conta cadastrado!!!');
    this.navController.navigateBack('/tipoConta');
    window.location.href = window.location.href.replace('register', '');

  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500
    });
    toast.present();
  }

  verificarTipo(tipo: string): boolean{
    this.tipos = JSON.parse(localStorage.getItem('tipoBD'));

    for(var i = 0; i < this.tipos.length; i++){
      if(this.tipos[i].nomeTipo === tipo){
        return true;
      }
    }

    return false;
  }
}
