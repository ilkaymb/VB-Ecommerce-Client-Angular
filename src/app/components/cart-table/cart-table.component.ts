import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { LocalStorageService } from 'src/services/localStorage.service';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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
  constructor(private localStorageService: LocalStorageService,private router: Router) {}

  displayedColumns: string[] = ['image', 'name', 'price','buttons'];
  cartProducts: any[] = this.localStorageService.getCartItems('cart') || [];

  dataSource = this.cartProducts;

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
  
}
