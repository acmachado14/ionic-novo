import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContaPage } from './conta.page';
import { NovaContaComponent } from './nova-conta/nova-conta.component';

const routes: Routes = [
  {
    path: '',
    component: ContaPage,
  },
  {
    path: 'register',
    component: NovaContaComponent,
  },
  {
    path: 'register/:id',
    component: NovaContaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContaPageRoutingModule {}
