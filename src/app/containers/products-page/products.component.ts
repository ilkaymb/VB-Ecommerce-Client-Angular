import { Component, Input } from '@angular/core';
import {
  CategoryService,
  DataService,
  LikeService,
} from 'src/services/data.services';
import { EarPhoneService } from 'src/services/data.services';

import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/services/localStorage.service';
import { DynamicDataService } from 'src/services/dynamicData.services';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(
    private likeService: LikeService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private categoryService: CategoryService,
    private dynamicDataService: DynamicDataService,
    private localStorageService: LocalStorageService
  ) {}

  options: any;
  currentCategory: string = 'computer';
  currentProducts: any;
  productCount: any;
  userId: number = 0;

  userLikes: any;
  categoriesJson: any;
  cartProducts: any[] = this.localStorage.getCartItems('cart') || [];
  categoryId: number = 0;

  ngOnInit(): void {
    // Kategori verilerini al
    this.categoryService.getData().subscribe((result) => {
      this.categoriesJson = result;
      this.options = result.map((element: any) => element.categoryName);
      console.log(this.options);

      // URL'den "category" parametresini al
      this.route.queryParams.subscribe((params) => {
        const category = params['category'];
        this.currentCategory = category;

        // Kategori ID'sini bul
        for (const categoryItem of this.categoriesJson) {
          if (this.currentCategory === categoryItem.categoryName) {
            this.categoryId = categoryItem.categoryId;
            console.log(this.categoryId);
            break;
          }
        }

        // Ürünleri getir
        if (category !== null) {
          this.dynamicDataService
            .getAllData(this.currentCategory)
            .subscribe((result) => {
              this.currentProducts = result;
              this.productCount = this.currentProducts.length;
            });
        } else {
          this.currentProducts = [];
          this.productCount = 0;
        }
      });

      // Kullanıcı beğenilerini kontrol et
      if (this.cookieService.check('customerToken')) {
        this.userId = parseInt(this.cookieService.get('userId'));
        this.likeService
          .getUserLikes(this.userId, this.categoryId, this.currentCategory)
          .subscribe((result) => {
            this.userLikes = result;
          });
      } else {
        this.userLikes = [];
      }
    });
  }
  isSelected(productId: any): boolean {
    if (this.cookieService.check('customerToken')) {
      if (this.userLikes.length === 0) {
        return false;
      } else {
        const filteredLikes = this.userLikes.filter((element: any) => {
          return element.id === productId;
        });

        // Burada filteredLikes dizisinde filtrelenmiş öğeler bulunuyor. Eğer bu dizinin uzunluğu 0 ise, ürün seçili değil demektir.
        return filteredLikes.length > 0;
      }
    }

    // Eğer kullanıcı oturumu açmamışsa veya ürün beğenileri yüklenmemişse, varsayılan olarak ürün seçili değil olarak kabul edebiliriz.
    return false;
  }

  addToCart(product: any): void {
    if (this.cookieService.check('customerToken')) {
      // Örnek bir ürün nesnesi
      const selectedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: this.currentCategory,
      };

      // Ürünü sepete ekleyin
      this.localStorage.addItemToCart('cart', selectedProduct);
    }
  }
  // Ürünü sepette bulunan ürünlerden kaldırmak için kullanılan metod
  removeFromCart(product: any): void {
    // Ürünü sepetten kaldırın
    this.localStorage.removeItemFromCart('cart', product);
  }

  toggleProductInCart(product: any): void {
    if (this.cookieService.check('customerToken')) {
      const cartItems = this.localStorage.getCartItems('cart');
      const isProductInCart = cartItems.some((item) => item.id === product.id);

      if (isProductInCart) {
        // Ürün sepette zaten var, bu nedenle kaldırın
        this.removeFromCart(product);
        this.cartProducts = this.cartProducts.filter((element: any) => {
          return element.id !== product.id;
        });
      } else {
        // Ürün sepette yok, bu nedenle ekleyin
        this.addToCart(product);
        this.cartProducts.push(product);
      }
    } else if (this.cookieService.check('adminToken')) {
      alert('Admin girişi var Lütfen müşteri girişi yapınız');
    } else {
      alert('Üye girişi yok Lütfen giriş yapınız');
    }
  }
  isCartSelected(productId: any): boolean {
    const filteredCartElements = this.cartProducts.filter((element: any) => {
      return (
        element.id === productId && element.category === this.currentCategory
      );
    });

    return filteredCartElements.length > 0;
  }
}
