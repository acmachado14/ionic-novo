import {
  Component,
  OnInit
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser';
import {
  NavController, AlertController
} from '@ionic/angular';
@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {
  currentMonth = 0;
  lastMonth = 0;
  private sizeCircle = 725;
  contas: any;
  contasUsuario: any = [];
  usuario = {
    userName: null,
    email: null,
    password: null,
  };
  meses: any = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  constructor(
    protected titleService: Title,
    protected navController: NavController,
    private alertController: AlertController
  ) {
    this.titleService.setTitle('Minha Conta');
  }

  getPercentage() {
    const percentage = (this.currentMonth * 100) / this.lastMonth / 100;
    return percentage;
  }

  setStroke() {
    return this.sizeCircle + this.sizeCircle * this.getPercentage();
  }

  arredondar(value) {
    return Math.floor(value);
  }

  ngOnInit() {
    this.contas = JSON.parse(localStorage.getItem('contaBD'));

    if (!this.contas) {
      this.contas = [];
      localStorage.setItem('contaBD', JSON.stringify(this.contas));
    }
    if (JSON.parse(localStorage.getItem('loginBD'))) {
      this.usuario = JSON.parse(localStorage.getItem('loginBD'));
      this.contas = JSON.parse(localStorage.getItem('contaBD'));
      this.verificarContas();
      this.obterContas(this.contasUsuario);
    } else {
      this.navController.navigateBack('/login');
    }
  }

  verificarContas() {
    for (var i = 0; i < this.contas.length; i++) {
      if (this.contas[i].usuario.userName === this.usuario.userName) {
        this.contasUsuario.push(this.contas[i]);
      }
    }
  }

  obterData(data: string): string {
    let date = new Date(data);
    let dataFormatada =
      date.getDate() +
      ' ' +
      this.meses[date.getMonth()] +
      ' ' +
      date.getFullYear();
    return dataFormatada;
  }

  obterContas(contas: any) {
    let currentDate = new Date();
    for (var i = 0; i < contas.length; i++) {
      let data = new Date(contas[i].dataVencimento);
      if (data.getMonth() === currentDate.getMonth()) {
        this.currentMonth += contas[i].valor;
        console.log(this.currentMonth);
      } else if (currentDate.getMonth() - 1 < 0) {
        let dez = 11;
        if (data.getMonth() === dez) {
          this.lastMonth += contas[i].valor;
        }
      } else if (currentDate.getMonth() - 1 === data.getMonth()) {
        this.lastMonth += contas[i].valor;
      }
    }
  }

  totalContas() {
    let total = 0;
    for (var i = 0; i < this.contasUsuario.length; i++) {
      total += this.contasUsuario[i].valor;
    }
    return total;
  }

  excluir(id: string) {
    let conta: any[] = null
    conta = this.contas.filter((temp) => {
      return temp.id === id
    });
    this.confirmarExclusao(conta[0]);
  }

  async confirmarExclusao(tipo: any) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: tipo.nomeTipo,
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Confirmar',
        cssClass: 'danger',
        handler: () => {
          this.contas = JSON.parse(localStorage.getItem('contaBD'));
          this.contas = this.contas.filter((temp) => {
            return temp.id != tipo.id
          });
          localStorage.setItem('contaBD', JSON.stringify(this.contas));
          this.navController.navigateBack('/conta');
          window.location.href = window.location.href;
          //this.exibirMensagem();
        }
      }]
    });
    await alert.present();
  }
}