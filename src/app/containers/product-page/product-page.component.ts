import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService, DataService, EarPhoneService } from 'src/services/data.services';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

constructor(private dataService: DataService,
  private route: ActivatedRoute,
  private router: Router,
  private earPhoneService:EarPhoneService) {}



  productName: string = '';
  productCategory: string = '';
  productModel:any;
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const productId = params['productId'];
    this.productCategory = params['productCategory'];
    if(this.productCategory!=null){
      if(this.productCategory=="Bilgisayar"){
        if (productId!=null) {
          this.dataService.getDataById(productId).subscribe((result) => {
            this.productModel=result;
            this.productName=result.model;
            console.log(this.productModel);
          });
        }
        else{
          this.router.navigate(['/login']);
        }
      }
      else if(this.productCategory=="Kulaklık"){
        if (productId!=null) {
          this.earPhoneService.getDataById(productId).subscribe((result) => {
            this.productModel=result;
            this.productName=result.model;
            console.log(this.productModel);
          });
        }
        else{
          this.router.navigate(['/login']);
        }
      }
    }


  });


}
}
