import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService, DataService, EarPhoneService } from 'src/services/data.services';
@Component({
  selector: 'app-product-update-page',
  templateUrl: './product-update-page.component.html',
  styleUrls: ['./product-update-page.component.css']
})
export class ProductUpdatePageComponent {

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private earPhoneService:EarPhoneService) {}

    productName: string = '';
    productId:string="";
    productCategory:string="";
    productModel:any;
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productId = params['productId'];
      this.productId=productId;
      const productCategory = params['productCategory'];
      this.productCategory=productCategory;
      if(productCategory!=null){
        if(productCategory=="Bilgisayar"){
          if (productId!=null) {
            this.dataService.getDataById(productId).subscribe((result) => {
              this.productName=result.model;
              this.productModel=result;
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
            });
          }
          else{
            this.router.navigate(['/login']);
          }
        }
      }
    });
  }
  updateProduct(){
    if(this.productCategory=="Bilgisayar"){
      this.dataService.updateDataById(this.productId,this.productModel).subscribe((result) => {
        alert("Ürün güncellendi ");
        this.router.navigate(['/admin'],{ queryParams: { category: this.productCategory } });
      });
    }
    else if(this.productCategory=="Kulaklık"){
        this.earPhoneService.updateDataById(this.productId,this.productModel).subscribe((result) => {
        alert("Ürün güncellendi ");
        this.router.navigate(['/admin'],{ queryParams: { category: this.productCategory } });
      });
    }
  }
}
