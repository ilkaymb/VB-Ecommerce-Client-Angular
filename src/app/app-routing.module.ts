import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './containers/main-page/main-page.component';
import { LogInPageComponent } from './containers/log-in-page/log-in-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { ProductsComponent } from './containers/products-page/products.component';
import { AdminPageComponent } from './containers/admin-page/admin-page.component';
import { ProductPageComponent } from './containers/product-page/product-page.component';
import { UserPageComponent } from './containers/user-page/user-page.component';
import { ProductUpdatePageComponent } from './containers/product-update-page/product-update-page.component';
import { CartPageComponent } from './containers/cart-page/cart-page.component';
import { PurchasedScreenComponent } from './containers/purchased-screen/purchased-screen.component';
import { CreateCategoryComponent } from './containers/create-category/create-category.component';
import { AddProductComponent } from './containers/add-product/add-product.component';
const routes: Routes = [ { path: '', component: MainPageComponent },
{ path: 'giris', component: LogInPageComponent },
{ path: 'kayit', component: RegisterPageComponent },
{ path: 'ürünler', component: ProductsComponent },
{ path: 'admin', component: AdminPageComponent },
{ path: 'ürün-sayfasi', component: ProductPageComponent},
{path: 'üye-sayfasi', component: UserPageComponent  },
{path: 'ürün-güncelle', component: ProductUpdatePageComponent  },
{path: 'sepet', component: CartPageComponent  },
{path: 'satin-alim', component: PurchasedScreenComponent  },
{path: 'create-category', component: CreateCategoryComponent  },
{path: 'add-product', component: AddProductComponent  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
