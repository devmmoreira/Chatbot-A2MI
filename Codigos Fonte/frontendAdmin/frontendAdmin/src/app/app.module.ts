import { ProductsModule } from './products/products.module';
import { ClientesModule } from './clientes/clientes.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminModule } from './login-admin/login-admin.module';
import { HomeComponent } from './home/home.component';
// import { ProductsComponent } from './products/products.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // ProductsComponent,
    UserInfoComponent,
    PaymentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginAdminModule,
    ClientesModule,
    FormsModule,
    ProductsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
