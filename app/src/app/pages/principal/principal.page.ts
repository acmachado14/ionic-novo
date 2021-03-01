import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  logado: boolean;
  user = {
    userName: null,
    password: null,
  };
  constructor(protected titleService: Title) {
    this.titleService.setTitle('Principal');
  }

  ngOnInit() {
    try {
      this.user.userName = JSON.parse(localStorage.getItem('loginBD')).userName;
      this.logado = true;
    } catch (error) {
      this.logado = false;
      console.log('nulo');
    }
    console.log(this.logado);
  }

  verificarNulo(): void {
    try {
      this.user.userName = JSON.parse(localStorage.getItem('loginBD')).userName;
      this.logado = true;
    } catch (error) {
      this.logado = true;
      console.log('nulo');
    }
  }
}
