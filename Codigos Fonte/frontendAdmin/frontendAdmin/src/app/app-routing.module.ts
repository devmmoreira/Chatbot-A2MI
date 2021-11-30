import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginAdminComponent } from './login-admin/login-admin.component';
import { HomeComponent } from './home/home.component'
import { ClientesComponent } from './clientes/clientes.component';
import { ProductsComponent } from './products/products.component'
import { UserInfoComponent } from './user-info/user-info.component'; 
import { PaymentFormComponent } from './payment-form/payment-form.component';


const routes: Routes = [
  {
    path: '',
    component: LoginAdminComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'cliente',
        component: ClientesComponent,
      },
      {
        path: 'user-info',
        component: UserInfoComponent,
      },
      {
        path: 'pagamento',
        component: ProductsComponent
      },
      {
        path: 'formulariopagamento',
        component: PaymentFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
