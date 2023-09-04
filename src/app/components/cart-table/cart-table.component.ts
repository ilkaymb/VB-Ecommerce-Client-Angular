import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { LocalStorageService } from 'src/services/localStorage.service';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SalesService } from 'src/services/data.services';
import { CookieService } from 'ngx-cookie-service';

export interface PeriodicElement {
  id: number;
  name: string;
  price: number;
}


@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css'],
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule],
})
export class CartTableComponent {
  constructor(private localStorageService: LocalStorageService,private router: Router,private salesService:SalesService,private cookieService:CookieService) {}
@Input()CartCheckout:string="";
@Input()CartTotal:string="";
@Input()CartEmpty:string="";
@Input()CartTableHeader1:string="";
@Input()CartTableHeader2:string="";
@Input()CartTableHeader3:string="";
@Input()CartTableHeader4:string="";

userId:number=parseInt(this.cookieService.get('userId'));



  displayedColumns: string[] = ['image', 'name', 'price','buttons'];
  cartProducts: any[] = this.localStorageService.getCartItems('cart') || [];

  dataSource = this.cartProducts;
  ngOnInit(): void {
    this.localStorageService.getCartItemsObservable().subscribe((items) => {
      this.cartProducts=items;
    });
  }
  totalPrice(){
    let total=0
    this.dataSource.map((element)=>{
      total=element.price+total
    })
    
    return total.toFixed(2);
  }

  productNavigate(productCategory:number,product_id:number){
    this.router.navigate(['/ürün-sayfasi'],{ queryParams: {productCategory:productCategory, productId: product_id } });

  }

  removeFromCart(product: any): void {
    // Ürünü sepetten kaldırın
    this.localStorageService.removeItemFromCart('cart', product);
    this.dataSource=this.dataSource.filter((element: any) => {
      return element.id !== product.id;
    });
  }

  buyProducts(): void {

    
    const transformedData = this.cartProducts.map(item => {
      let customerId = 0;
    let categoryId = 0;
      if (item.category === "Bilgisayar") {
        categoryId = 1;
      } else if (item.category === "Kulaklık") {
        categoryId = 2;
      }
      return {
        product_category:categoryId ,
        product_id: item.id,
        customer_id:this.userId
      };
    });
    
  
    this.salesService.addSales(transformedData).subscribe((response:any) => {

      console.log('Başarılı yanıt:', response);
    },
    error => {
      console.error('Hata:', error);
    });
  
    this.localStorageService.clearCart('cart');  

    this.dataSource = [];
    this.cartProducts=[]
    alert("Satın alma işlemi başarılı")

    
  }

  
}
