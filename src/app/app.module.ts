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
import { LoginScreenComponent } from './components/login-components/login-screen/login-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { RegisterScreenComponent } from './components/register-screen/register-screen.component';
import { AdminScreenComponent } from './components/admin-screen/admin-screen.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductSearchBarComponent } from './components/product-search-bar/product-search-bar.component';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';
import { ProductPageComponent } from './containers/product-page/product-page.component';

import {MatGridListModule} from '@angular/material/grid-list';
import { VirtualKeyboardComponent } from './components/virtual-keyboard/virtual-keyboard.component';
import { UserPageComponent } from './containers/user-page/user-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService, EarPhoneService } from 'src/services/data.services';
import { ProductUpdatePageComponent } from './containers/product-update-page/product-update-page.component';
import { CookieService } from 'ngx-cookie-service'; // ngx-cookie-service eklemeyi unutmayın
import { Deneme } from 'src/services/auth.servives';
import { CartPageComponent } from './containers/cart-page/cart-page.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { PurchasedScreenComponent } from './containers/purchased-screen/purchased-screen.component';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    EntranceComponent,
    MainPageComponent,
    LogInPageComponent,
    ProductsComponent,
    RegisterPageComponent, 
    AdminPageComponent,
     ProductsContainerComponent,
     AdminScreenComponent,
     ProductPageComponent,
     LoginScreenComponent,
     RegisterScreenComponent,
     UserPageComponent,
     ProductUpdatePageComponent,
     CartPageComponent,
     PurchasedScreenComponent,
     

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    VirtualKeyboardComponent,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,SearchBarComponent, NgbModule,
    ProductSearchBarComponent,MatGridListModule,MatButtonModule,CartTableComponent,MatTableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
,

MatSlideToggleModule,
MatPaginatorModule,
JsonPipe,
  ],
  providers: [AuthService,CookieService,Deneme
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// required for AOT compilation
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}