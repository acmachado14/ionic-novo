import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoContaPage } from './tipo-conta.page';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: TipoContaPage,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoContaPageRoutingModule {}
