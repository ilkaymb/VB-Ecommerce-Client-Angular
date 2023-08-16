import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EntranceComponent } from './components/entrance/entrance.component';
import { MainPageComponent } from './containers/main-page/main-page.component';
import { LogInPageComponent } from './containers/log-in-page/log-in-page.component';
import { ProductsComponent } from './containers/products-page/products.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { AdminPageComponent } from './containers/admin-page/admin-page.component';
import { ProductsContainerComponent } from './components/products-components/products-container/products-container.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    EntranceComponent,
    MainPageComponent,
    LogInPageComponent,
    ProductsComponent,RegisterPageComponent, AdminPageComponent, ProductsContainerComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
