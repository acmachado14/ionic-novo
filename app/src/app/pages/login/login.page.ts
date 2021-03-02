import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  pessoas: any = [];
  pessoa = {
    userName: null,
    password: null
  };

  login = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(protected titleService: Title, private navController: NavController, private toastController: ToastController) {
    this.titleService.setTitle('Log in');
  }

  ngOnInit() {
    localStorage.setItem('loginBD', JSON.stringify(null));

    this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));

    this.login.get('userName').setValue(this.pessoa.userName);
    this.login.get('password').setValue(this.pessoa.password);
  }

  loginClick(){
    this.pessoa.userName = this.login.value.userName;
    this.pessoa.password = this.login.value.password;

    let controle = false;
    if (this.pessoas.length != null){
     for(var i = 0; i < this.pessoas.length; i++){
       if(this.pessoas[i].userName === this.pessoa.userName && this.pessoas[i].password === this.pessoa.password){
         localStorage.setItem('loginBD', JSON.stringify(this.pessoas[i]));
          this.navController.navigateBack('/principal');
         controle = true;
         window.location.href = window.location.href.replace('login', 'principal');
       }
      }
    }

    if(!controle){
    this.exibirMensagem("Usuario ou Senha Incorretos!!");
    }
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500
    });
    toast.present();
  }

}
