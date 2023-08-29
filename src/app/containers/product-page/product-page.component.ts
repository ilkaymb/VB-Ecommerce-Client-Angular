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

  productModel: {
    brand: string;
    model: string;
    image_Path: string;
    price: number;
    processor: string;
    ram_Capacity: number;
    storage_Capacity: number;
  }= {
  brand: "",
  model:"",
  image_Path: "",
  price: 0,
  processor: "",
  ram_Capacity: 0,
  storage_Capacity: 0
};

earPhoneModel: {
  brand: string;
  model: string;
  image_Path: string;
  price: number;
color:string
}= {
brand: "",
model:"",
image_Path: "",
price: 0,
color:""
};

  productName: string = '';
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const productId = params['productId'];
    const productCategory = params['productCategory'];
    if(productCategory!=null){
      if(productCategory=="Bilgisayar"){
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
      else if(productCategory=="Kulaklık"){
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
