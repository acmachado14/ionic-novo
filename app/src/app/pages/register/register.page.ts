import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from "@ionic/angular";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  pessoas: any = [];
  pessoa = {
    userName: null,
    email: null,
    password: null
  };

  cadastro = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(protected titleService: Title, private activatedRoute: ActivatedRoute, private navController: NavController, private toastController: ToastController) {
    this.titleService.setTitle('Cadastro');
  }

  ngOnInit() {
    this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));
    if(!this.pessoas){
      this.pessoas = []
      localStorage.setItem('usuarioBD', JSON.stringify(this.pessoas));
    }

    this.cadastro.get('userName').setValue(this.pessoa.userName);
    this.cadastro.get('email').setValue(this.pessoa.email);
    this.cadastro.get('password').setValue(this.pessoa.password);
  }

  cadastrarClick() {
    this.pessoa.userName = this.cadastro.value.userName;
    this.pessoa.email = this.cadastro.value.email;
    this.pessoa.password = this.cadastro.value.password;

    this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));

    this.pessoas.push(this.pessoa);

    localStorage.setItem('usuarioBD', JSON.stringify(this.pessoas));
    this.exibirMensagem('Usuário cadastrado com sucesso!');

    this.navController.navigateBack('/login');
    window.location.href = window.location.href.replace('register', 'login');
  }

  verificarUsuario(userName: any): Boolean{
    this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));

    for(var i = 0; i< this.pessoas.length; i++){
      if(userName === this.pessoas[i].userName){
        return true;
      }
    }

    return false;
  }

  verificarEmail(email: any): Boolean{
    this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));
    for(var i = 0; i< this.pessoas.length; i++){
      if(email === this.pessoas[i].email){
        return true;
      }
    }

    return false;
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

}
