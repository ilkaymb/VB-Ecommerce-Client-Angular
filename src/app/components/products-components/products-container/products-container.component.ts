import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LikeService } from 'src/services/data.services';
import { LocalStorageService } from 'src/services/localStorage.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent  implements OnInit {
  searchedProducts:string="";
  @Input() currentProducts: any[] = []; // @Input dekoratörü ile gelen veriyi saklamak için dizi
  @Input() userLikes: any[] = []; 
  @Input()currentCategory:string="Bilgisayar";
  @Input()options:Array<string>=[];
  searchedProduct=""

  
  searchProductFun(newSearch:string){
      this.searchedProduct=newSearch;
    
  }

  changeCurrentCategory(newCurrentCategory:string){
    this.currentCategory=newCurrentCategory;
  }

  value=""
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  @Input() length:any ;
  pageSize = 16;
  pageIndex = 0;
  pageSizeOptions = [16, 24, 32];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent | undefined;

  getProduction(){
    const searchTextRegex = new RegExp(this.searchedProduct, 'i'); 
      return this.currentProducts.slice(this.pageIndex*this.pageSize, (this.pageIndex+1)*this.pageSize).filter(product => {
        return searchTextRegex.test(product.model) || searchTextRegex.test(product.brand);
      });
    
  
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

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


  constructor(private router: Router,private cookieService: CookieService,private likeService: LikeService,private localStorageService: LocalStorageService) {}

  productPageButtonClicked(productCategory:any,productId:any){
    this.router.navigate(['/ürün-sayfasi'],{ queryParams: {productCategory:productCategory, productId: productId } });

  }

  productLikeButton(productId:any){
    if( this.cookieService.check('customerToken')){
      const userId:number=parseInt(this.cookieService.get('userId'));

      const productCategoryId=this.productIdFunction()

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

  isSelected(productId: any): boolean {
    const filteredLikes = this.userLikes.filter((element: any) => {
      return element.id === productId;
    });
  
    return filteredLikes.length > 0;
  }

 // Ürünü sepete eklemek için kullanılan metod
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

cartProducts: any[] = this.localStorageService.getCartItems('cart') || [];
toggleProductInCart(product: any): void {
  console.log(product)
  if( this.cookieService.check('customerToken')){
    const cartItems = this.localStorageService.getCartItems('cart');
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

  // Örnek bir ürün nesnesi

}
isCartSelected(productId: any): boolean {
  const filteredCartElements = this.cartProducts.filter((element: any) => {
    return element.id === productId;
  });

  return filteredCartElements.length > 0;
}

}


  

