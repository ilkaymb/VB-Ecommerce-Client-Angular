import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CustomerService, DataService, EarPhoneService, LikeService } from 'src/services/data.services';
import { LocalStorageService } from 'src/services/localStorage.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  constructor(private router: Router,
    private cookieService: CookieService,
    private likeService: LikeService,
    private localStorageService: LocalStorageService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private earPhoneService:EarPhoneService) {}


  productName: string = '';
  productCategory: string = '';
  productModel:any;
  userLikes:any;
  userId:number=0;
  productCategoryId:number=0;
  productId:any;
  cartProducts: any[] = this.localStorageService.getCartItems('cart') || [];



  productIdFunction(category:string){
    if(category=="Bilgisayar"){
      return 1;
    }
    else if(category=="Kulaklık"){
    return 2;
    }
    else{
      return 0;
    }
  }  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productId = params['productId'];
      const productCategory = params['productCategory'];
      this.productCategoryId = this.productIdFunction(productCategory);
      this.productCategory=productCategory;
  
      if (productId != null) {
        if (productCategory === 'Bilgisayar') {
          this.getDataAndSetProduct('computerService', productId);
        } else if (productCategory === 'Kulaklık') {
          this.getDataAndSetProduct('earPhoneService', productId);
        } else {
          // Bilinmeyen bir kategori durumu veya başka bir işlem yapılabilir.
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
    this.localStorageService.getCartItemsObservable().subscribe((items) => {
      this.cartProducts=items;
    });
  }
  private services: { [key: string]: any } = {
    computerService: this.dataService,
    earPhoneService: this.earPhoneService,
  };
  
  private getDataAndSetProduct(serviceName: string, productId: any): void {
    const service = this.services[serviceName];
  
    if (service) {
      service.getDataById(productId).subscribe((result:any) => {
        this.productModel = result;
        this.productName = result.model;
  
        if (this.cookieService.check('customerToken')) {
          this.userId = parseInt(this.cookieService.get('userId'));
          this.likeService.getUserLikes(this.userId, this.productCategoryId).subscribe((result) => {
            this.userLikes = result;
          });
        } else {
          this.userLikes = [];
        }
      });
    }
  }

isSelected(productId: any): boolean {
  const filteredLikes = this.userLikes.filter((element: any) => {
    return element.id === productId;
  });
  return filteredLikes.length > 0;
}

// Ürünü sepete eklemek için kullanılan metod
addToCart(): void {
if( this.cookieService.check('customerToken')){
 // Örnek bir ürün nesnesi
 const selectedProduct = {
  id: this.productModel.id,
  name: this.productModel.model,
  price: this.productModel.price,
  image: this.productModel.image_Path,
  category:this.productCategory,
};
// Ürünü sepete ekleyin
this.localStorageService.addItemToCart('cart', selectedProduct);
}
else if( this.cookieService.check('adminToken')){
alert("Admin girişi var Lütfen müşteri girişi yapınız")
}
else{
alert("Üye girişi yok Lütfen giriş yapınız")
}
}

// Ürünü sepette bulunan ürünlerden kaldırmak için kullanılan metod
removeFromCart(product: any): void {
// Ürünü sepetten kaldırın
this.localStorageService.removeItemFromCart('cart', product);
}

toggleProductInCart(): void {

if( this.cookieService.check('customerToken')){
  const cartItems = this.localStorageService.getCartItems('cart');
  const isProductInCart = cartItems.some((item) => item.id === this.productModel.id);

  if (isProductInCart) {
    // Ürün sepette zaten var, bu nedenle kaldırın
    this.removeFromCart(this.productModel);
    this.cartProducts=this.cartProducts.filter((element: any) => {
      return element.id !== this.productModel.id;
    });
  } else {
    // Ürün sepette yok, bu nedenle ekleyin
    this.addToCart();
    this.cartProducts.push()
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
  console.log(element.id+" "  +productId)
  return element.id === productId;
});

return filteredCartElements.length > 0;
}

productLikeButton(productId:any){
  if( this.cookieService.check('customerToken')){
    const userId:number=parseInt(this.cookieService.get('userId'));

    const productCategoryId=this.productIdFunction(this.productCategory)

this.likeService.checkLike({product_id:productId,customer_id:userId,category_id:productCategoryId}).subscribe((data:any)=>{
console.log(data)
if(!data){
this.likeService.addLike({product_id:productId,customer_id:userId,category_id:productCategoryId}).subscribe((data:any)=>{
this.userLikes.push({id:productId})
console.log(this.userLikes)
    console.log(data)
  } 
  )
}
else{
  this.likeService.removeLike({product_id:productId,customer_id:userId,category_id:productCategoryId}).subscribe((data:any)=>{
    this.userLikes=this.userLikes.filter((element: any) => {
      console.log(element.id+" "  +productId)
      return element.id !== productId;
    });
    console.log(data)
  }
  )
}
})
  }
  else if( this.cookieService.check('adminToken')){
    alert("Admin girişi var Lütfen müşteri girişi yapınız")
  }
  else{
    alert("Üye girişi yok Lütfen giriş yapınız")
  }
}
}
