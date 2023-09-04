import { Component, Input } from '@angular/core';
import { DataService, LikeService } from 'src/services/data.services';
import { EarPhoneService } from 'src/services/data.services';

import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/services/localStorage.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private dataService: DataService,
    private ear:EarPhoneService,
    private likeService:LikeService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private localStorage:LocalStorageService) { 



    }

  options: string[] = ['Bilgisayar', 'Kulaklık', 'Playstation','Xbox'];
  currentCategory: string="Bilgisayar";
  currentProducts:any;
  productCount:any;
  userId:number=0;
  productCategoryId=this.productIdFunction();
  userLikes:any;
  cartProducts: any[] = this.localStorage.getCartItems('cart') || [];

  productIdFunction(){
    if(this.currentCategory=="Bilgisayar"){
      return 1;
    }
    else if(this.currentCategory=="Kulaklık"){
    return 2;
    }
    else{
      return 0;
    }
  }  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];

      if (category === 'Bilgisayar') {
        this.dataService.getData().subscribe((result) => {
          this.currentProducts = result;
          this.productCount = this.currentProducts.length;
        });
      } else if (category === 'Kulaklık') {
        this.ear.getData().subscribe((result) => {
          this.currentProducts = result;
          this.productCount = this.currentProducts.length;
        });
      } else {
        this.currentProducts = [];
        this.productCount = 0;
      }

      if (this.cookieService.check('customerToken')) {
        this.userId = parseInt(this.cookieService.get('userId'));
        this.productCategoryId = this.productIdFunction();
        this.likeService.getUserLikes(this.userId, this.productCategoryId).subscribe((result) => {
          this.userLikes = result;
        });
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
    if( this.cookieService.check('customerToken')){
     // Örnek bir ürün nesnesi
     const selectedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category:this.currentCategory,
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
    if( this.cookieService.check('customerToken')){
      const cartItems = this.localStorage.getCartItems('cart');
      const isProductInCart = cartItems.some((item) => item.id === product.id);
  
      if (isProductInCart) {
        // Ürün sepette zaten var, bu nedenle kaldırın
        this.removeFromCart(product);
        this.cartProducts=this.cartProducts.filter((element: any) => {
          return element.id !== product.id;
        });
      } else {
        // Ürün sepette yok, bu nedenle ekleyin
        this.addToCart(product);
        this.cartProducts.push(product)
      }
    }
    else if( this.cookieService.check('adminToken')){
      alert("Admin girişi var Lütfen müşteri girişi yapınız")
    }
    else{
      alert("Üye girişi yok Lütfen giriş yapınız")
    }
  }
  isCartSelected(productId: any): boolean {
    const filteredCartElements = this.cartProducts.filter((element: any) => {
      return element.id === productId;
    });
  
    return filteredCartElements.length > 0;
  }
}
