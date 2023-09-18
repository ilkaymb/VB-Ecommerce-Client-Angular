import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  CategoryService,
  CustomerService,
  DataService,
  EarPhoneService,
  LikeService,
} from 'src/services/data.services';
import { DynamicDataService } from 'src/services/dynamicData.services';
import { LocalStorageService } from 'src/services/localStorage.service';
import { LogService } from 'src/services/log.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private likeService: LikeService,
    private localStorageService: LocalStorageService,
    private dynamicDataService: DynamicDataService,
    private logService: LogService,
    private categoryService: CategoryService
  ) {}

  productName: string = '';
  productCategory: string = '';
  productModel: any;
  userLikes: any;
  userId: number = 0;
  productCategoryId: number = 0;
  productId: any;
  cartProducts: any[] = this.localStorageService.getCartItems('cart') || [];
  currentCategory: string = 'computer';
  currentProducts: any;
  types: any[] = [];
  selectedProduct: string = 'computer'; // Seçilen ürünü saklamak için değişken
  product: any;
  categoryId: number = 0;
  categoriesJson: any;
  options: any;

  ngOnInit(): void {
    // Kategori verilerini al
    this.categoryService.getData().subscribe((result) => {
      this.categoriesJson = result;
      this.options = result.map((element: any) => element.categoryName);
      console.log(this.options);

      // URL'den "category" parametresini al
      this.route.queryParams.subscribe((params) => {
        const category = params['productCategory'];
        const product_id = params['productId'];
        this.productId = product_id;
        this.currentCategory = category;

        // Kategori ID'sini bul
        for (const categoryItem of this.categoriesJson) {
          if (this.currentCategory === categoryItem.categoryName) {
            this.categoryId = categoryItem.categoryId;
            console.log(this.categoryId);
            break;
          }
        }

        if (category !== null) {
          this.dynamicDataService
            .getTableColumns(this.currentCategory)
            .subscribe((result) => {
              console.log(result);
              this.types = result;
            });
        }
        if (this.productId !== null) {
          this.dynamicDataService
            .getSingleData(this.currentCategory, this.productId)
            .subscribe((result) => {
              console.log(result);
              this.productModel = result;
            });
        }
        if (this.cookieService.check('customerToken')) {
          this.userId = parseInt(this.cookieService.get('userId'));
          this.likeService
            .getUserLikes(this.userId, this.categoryId, this.currentCategory)
            .subscribe((result) => {
              console.log(result);
              this.userLikes = result;
            });
        } else {
          this.userLikes = [];
        }
      });
    });
  }
  /*
  ngOnInit(): void {
    this.localStorageService.getCartItemsObservable().subscribe((items) => {
      this.cartProducts = items;
    });

    this.router.queryParams.subscribe((params) => {
      const category = params['productCategory'];
      const product_id = params['productId'];
      this.productId = product_id;
      this.currentCategory = category;

              // Kategori ID'sini bul
              for (const categoryItem of this.categoriesJson) {
                if (this.currentCategory === categoryItem.categoryName) {
                  this.categoryId = categoryItem.categoryId;
                  console.log(this.categoryId);
                  break;
                }
              }
      console.log(category);
      if (category !== null) {
        this.dynamicDataService
          .getTableColumns(this.currentCategory)
          .subscribe((result) => {
            console.log(result);
            this.types = result;
          });
      }
      if (this.productId !== null) {
        this.dynamicDataService
          .getSingleData(this.currentCategory, this.productId)
          .subscribe((result) => {
            console.log(result);
            this.productModel = result;
          });
      }
      if (this.cookieService.check('customerToken')) {
        this.userId = parseInt(this.cookieService.get('userId'));
        this.productCategoryId = this.productIdFunction();
        this.likeService
          .getUserLikes(
            this.userId,
            this.productCategoryId,
            this.currentCategory
          )
          .subscribe((result) => {
            console.log(result);
            this.userLikes = result;
          });
      } else {
        this.userLikes = [];
      }
    });
  }*/

  getFieldType(type: string): string {
    if (type.includes('int')) {
      return 'number';
    } else if (type.includes('decimal')) {
      return 'number';
    } else {
      return 'text';
    }
  }

  isSelected(productId: any): boolean {
    const filteredLikes = this.userLikes.filter((element: any) => {
      return element.id === productId;
    });
    return filteredLikes.length > 0;
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

      // Müşteri girişi yapılmışsa işleme devam et
      let isInCart = false;

      // Sepette aynı ürünün olup olmadığını kontrol et
      this.cartProducts.forEach((element: any, index: number) => {
        if (
          element.id == product.id &&
          element.category == this.currentCategory
        ) {
          // Aynı ürünü sepetten çıkar
          this.removeFromCart(element);
          this.cartProducts.splice(index, 1); // Ürünü listeden kaldır
          isInCart = true;
          return; // Döngüden çık
        }
      });

      // Ürün sepete eklenmediyse, sepete ekle
      if (!isInCart) {
        this.addToCart(product);
        this.cartProducts.push(product);
      }
    } else if (this.cookieService.check('adminToken')) {
      alert('Admin girişi var. Lütfen müşteri girişi yapınız.');
    } else {
      alert('Üye girişi yok. Lütfen giriş yapınız.');
    }
  }

  isCartSelected(productId: any, category: any): boolean {
    // Kategori kontrolü
    this.cartProducts = this.localStorageService.getCartItems('cart');

    if (category !== this.currentCategory) {
      return false;
    }

    // Ürünleri filtrele
    const filteredCartElements = this.cartProducts.filter((element) => {
      return element.id === productId && element.category === category;
    });

    // Filtre sonucunu kontrol et ve sonucu döndür
    return filteredCartElements.length > 0;
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
}
