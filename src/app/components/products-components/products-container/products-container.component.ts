import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LikeService } from 'src/services/data.services';
import { LocalStorageService } from 'src/services/localStorage.service';
import { LogService } from 'src/services/log.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css'],
})
export class ProductsContainerComponent {
  @Input() currentProducts: any[] = []; // @Input dekoratörü ile gelen veriyi saklamak için dizi
  @Input() userLikes: any[] = [];
  @Input() currentCategory: string = '';
  @Input() options: Array<string> = [];
  @Input() searchbarPlaceholder: string = '';
  @Input() ProductsButton: string = '';
  @Input() cartProducts: any[] =
    this.localStorageService.getCartItems('cart') || [];
  @Input() categoryId: number = 0;

  searchedProducts: string = '';
  searchedProduct = '';
  value = '';
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  @Input() length: any;
  pageSize = 16;
  pageIndex = 0;
  pageSizeOptions = [16, 24, 32];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent | undefined;

  searchProductFun(newSearch: string) {
    this.searchedProduct = newSearch;
  }

  changeCurrentCategory(newCurrentCategory: string) {
    this.currentCategory = newCurrentCategory;
  }

  getProduction() {
    const searchTextRegex = new RegExp(this.searchedProduct, 'i');
    return this.currentProducts
      .filter((product) => {
        return (
          (searchTextRegex.test(product.model) ||
            searchTextRegex.test(product.brand)) &&
          product.stock !== 0
        );
      })
      .slice(
        this.pageIndex * this.pageSize,
        (this.pageIndex + 1) * this.pageSize
      );
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private likeService: LikeService,
    private localStorageService: LocalStorageService,
    private logService: LogService
  ) {}

  productPageButtonClicked(productCategory: any, productId: any) {
    this.router.navigate(['/ürün-sayfasi'], {
      queryParams: { productCategory: productCategory, productId: productId },
    });
  }

  productLikeButton(productId: any) {
    if (this.cookieService.check('customerToken')) {
      const userId: number = parseInt(this.cookieService.get('userId'));
      this.likeService
        .checkLike({
          product_id: productId,
          customer_id: userId,
          category_id: this.categoryId,
        })
        .subscribe((data: any) => {
          if (!data) {
            this.likeService
              .addLike(
                {
                  product_id: productId,
                  customer_id: userId,
                  category_id: this.categoryId,
                },
                this.currentCategory
              )
              .subscribe((data: any) => {
                this.userLikes.push({ id: productId });

                console.log({
                  userType: 'customer',
                  userName: userId.toString(),
                  action: 'Add Like',
                  description: `User with ID ${userId} like for product ID ${productId}`,
                  errorDetails: '', // Hata olmadığında null bırakabilirsiniz
                });
                this.logService
                  .addLog({
                    userType: 'customer',
                    userName: userId.toString(),
                    action: 'Add Like',
                    description: `User with ID ${userId} like for product ID ${productId}`,
                    errorDetails: '',
                  })
                  .subscribe((res) => {
                    console.log(res);
                    // Log kaydı eklenme durumunda burada yapılması gereken işlemler
                  });
              });
          } else {
            this.likeService
              .removeLike(
                {
                  product_id: productId,
                  customer_id: userId,
                  category_id: this.categoryId,
                },
                this.currentCategory
              )
              .subscribe((data: any) => {
                this.userLikes = this.userLikes.filter((element: any) => {
                  return element.id !== productId;
                });
                console.log({
                  userType: 'customer',
                  userName: userId.toString(),
                  action: 'Remove Like',
                  description: `User with ID ${userId} remove like for product ID ${productId}`,
                  errorDetails: '',
                });
                this.logService
                  .addLog({
                    userType: 'customer',
                    userName: userId.toString(),
                    action: 'Remove Like',
                    description: `User with ID ${userId} remove like for product ID ${productId}`,
                    errorDetails: '',
                  })
                  .subscribe((res) => {
                    console.log(res);
                    // Log kaydı eklenme durumunda burada yapılması gereken işlemler
                  });
              });
          }
        });
    } else if (this.cookieService.check('adminToken')) {
      alert('Admin girişi var Lütfen müşteri girişi yapınız');
    } else {
      alert('Üye girişi yok Lütfen giriş yapınız');
    }
  }

  isSelected(productId: any): boolean {
    if (this.cookieService.check('customerToken')) {
      // Ürünleri filtrele
      const filteredCartElements = this.userLikes.filter((element) => {
        return element.id === productId;
      });

      // Filtre sonucunu kontrol et ve sonucu döndür
      return filteredCartElements.length > 0;
    } else {
      return false;
    }
  }
  // Ürünü sepete eklemek için kullanılan metod
  addToCart(product: any): void {
    if (this.cookieService.check('customerToken')) {
      // Örnek bir ürün nesnesi
      const selectedProduct = {
        id: product.id,
        model: product.name,
        price: product.price,
        image_path: product.image,
        category: this.currentCategory,
      };

      // Ürünü sepete ekleyin
      this.localStorageService.addItemToCart('cart', selectedProduct);
    } else if (this.cookieService.check('adminToken')) {
      alert('Admin girişi var Lütfen müşteri girişi yapınız');
    } else {
      alert('Üye girişi yok Lütfen giriş yapınız');
    }
  }

  // Ürünü sepette bulunan ürünlerden kaldırmak için kullanılan metod
  removeFromCart(product: any): void {
    // Ürünü sepetten kaldırın
    this.localStorageService.removeItemFromCart('cart', product);
  }

  toggleProductInCart(product: any): void {
    if (this.cookieService.check('customerToken')) {
      this.cartProducts = this.localStorageService.getCartItems('cart');
      const isProductInCart = this.cartProducts.some(
        (item) => item.id === product.id
      );

      if (isProductInCart) {
        // Ürün sepette zaten var, bu nedenle kaldırın
        this.removeFromCart(product);
        this.cartProducts = this.cartProducts.filter((element: any) => {
          return !(
            element.id === product.id && element.category === product.category
          );
        });
      } else {
        // Ürün sepette yok, bu nedenle ekleyin
        this.addToCart(product);
        this.cartProducts.push(product);
      }
    } else if (this.cookieService.check('adminToken')) {
      alert('Admin girişi var. Lütfen müşteri girişi yapınız.');
    } else {
      alert('Üye girişi yok. Lütfen giriş yapınız.');
    }
  }

  isCartSelected(product: any): boolean {
    if (this.cookieService.check('customerToken')) {
      // Ürünleri filtrele
      this.cartProducts = this.localStorageService.getCartItems('cart');

      const filteredCartElements = this.cartProducts.filter((element) => {
        return (
          element.id === product.id && element.category === this.currentCategory
        );
      });

      // Filtre sonucunu kontrol et ve sonucu döndür
      return filteredCartElements.length > 0;
    } else {
      // Eğer müşteri girişi yoksa, herhangi bir ürün seçili sayılmaz
      return false;
    }
  }
}
