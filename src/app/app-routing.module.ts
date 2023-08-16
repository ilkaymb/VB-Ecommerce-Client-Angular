import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './containers/main-page/main-page.component';
import { LogInPageComponent } from './containers/log-in-page/log-in-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { ProductsComponent } from './containers/products-page/products.component';
import { AdminPageComponent } from './containers/admin-page/admin-page.component';
const routes: Routes = [ { path: '', component: MainPageComponent },
{ path: 'giris', component: LogInPageComponent },
{ path: 'kayit', component: RegisterPageComponent },
{ path: 'ürünler', component: ProductsComponent },{ path: 'admin', component: AdminPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
