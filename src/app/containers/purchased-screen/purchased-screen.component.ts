import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SalesService } from 'src/services/data.services';

@Component({
  selector: 'app-purchased-screen',
  templateUrl: './purchased-screen.component.html',
  styleUrls: ['./purchased-screen.component.css']
})
export class PurchasedScreenComponent {
  constructor(private router:Router,private salesService : SalesService,private cookieService:CookieService,private route: ActivatedRoute){}


dataSource = []
  displayedColumns: string[] = ['adet','image', 'name', 'price','date','buttons'];
  userId:number=parseInt(this.cookieService.get('userId'));
  productCategoryId:any;
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
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.route.queryParams.subscribe(params => {
    const category = params['category'];
    this.productCategoryId=this.productIdFunction(category);

      this.salesService.getSalesByCustomerAndProduct(this.userId,1).subscribe((result) => {
        console.log(result)
       this.dataSource=result;
      });
  });
}

  productNavigate(productCategory:number,product_id:number){
    this.router.navigate(['/ürün-sayfasi'],{ queryParams: {productCategory:productCategory, productId: product_id } });

  }



}
