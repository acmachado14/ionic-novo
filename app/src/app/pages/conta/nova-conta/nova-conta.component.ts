import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavController, ToastController } from '@ionic/angular';
import { v4 as uuid } from 'uuid';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-nova-conta',
  templateUrl: './nova-conta.component.html',
  styleUrls: ['./nova-conta.component.scss'],
})
export class NovaContaComponent implements OnInit {
  usuario: any;
  uuid = null;
  tiposContas: any;
  indice = null;
  contas: any = [];
  userConta = {
    id: null,
    descricao: null,
    tipo: null,
    valor: null,
    dataVencimento: null,
    situacao: null,
    usuario: null,
  };
  conta = new FormGroup({
    descricao: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    valor: new FormControl('', [Validators.required, Validators.min(1)]),
    dataVencimento: new FormControl('', Validators.required),
    situacao: new FormControl('', Validators.required),
  });
  constructor(protected titleService: Title, protected navController: NavController, private toastController: ToastController,private activatedRoute: ActivatedRoute) {
    titleService.setTitle('Nova Conta');
  }

  ngOnInit() {
    this.contas = JSON.parse(localStorage.getItem('contaBD'));

    if (!this.contas) {
      this.contas = [];
      localStorage.setItem('contaBD', JSON.stringify(this.contas));
    }

    if (JSON.parse(localStorage.getItem('loginBD'))) {
      this.usuario = JSON.parse(localStorage.getItem('loginBD'));
      this.tiposContas = JSON.parse(localStorage.getItem('tipoBD'));
    } else {
      this.navController.navigateBack('/login');
    }
    this.activatedRoute.params.subscribe( param => {
      if(param['id']){
        for(var i = 0; i < this.contas.length; i++){
          if(this.contas[i].id == param['id']){
            this.userConta = this.contas[i];
            this.uuid = this.contas[i].id;
            this.indice = i;
          }
        }
      }
    });

    this.conta.get('descricao').setValue(this.userConta.descricao);
    this.conta.get('tipo').setValue(this.userConta.tipo);
    this.conta.get('valor').setValue(this.userConta.valor);
    this.conta.get('dataVencimento').setValue(this.userConta.dataVencimento);
    this.conta.get('situacao').setValue(this.userConta.situacao);
  }

  salvarConta() {
    this.contas = JSON.parse(localStorage.getItem('contaBD'));

    if(this.uuid){
      if(this.contas.find( conta => conta.id === this.uuid)){
        this.userConta.id = this.uuid;
        this.userConta.descricao = this.conta.value.descricao;
        this.userConta.tipo = this.conta.value.tipo;
        this.userConta.valor = this.conta.value.valor;
        this.userConta.dataVencimento = this.conta.value.dataVencimento;
        this.userConta.situacao = this.conta.value.situacao;
        this.userConta.usuario = this.usuario;
        this.contas[this.indice] = this.userConta;
        this.exibirMensagem('Conta Editada!!!');
      }
    }else{
      this.userConta.id = uuid();
      this.userConta.descricao = this.conta.value.descricao;
      this.userConta.tipo = this.conta.value.tipo;
      this.userConta.valor = this.conta.value.valor;
      this.userConta.dataVencimento = this.conta.value.dataVencimento;
      this.userConta.situacao = this.conta.value.situacao;
      this.userConta.usuario = this.usuario;
      this.contas.push(this.userConta);
      this.exibirMensagem('Conta cadastrada!!!');
    }

    localStorage.setItem('contaBD', JSON.stringify(this.contas));

    this.navController.navigateBack('/conta');
    window.location.href = window.location.href.replace('register', '');
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
    });
    toast.present();
  }
}
