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
    private router: Router,private earPhoneService:EarPhoneService) {}
    productModel:any;
    computerModel: {
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

   color:string;
  }= {
  brand: "",
  model:"",
  image_Path: "",
  price: 0,
color:"",
};

  
    productName: string = '';
productId:string="";
    productCategory:string="";
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
              this.computerModel=result;
              this.productName=result.model;
              this.productModel=this.computerModel;

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
              this.earPhoneModel=result;
              this.productModel=this.earPhoneModel;
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

  updateProduct(){
    if(this.productCategory=="Bilgisayar"){
      this.dataService.updateDataById(this.productId,this.computerModel).subscribe((result) => {
        alert("Ürün güncellendi ");
        this.router.navigate(['/admin'],{ queryParams: { category: this.productCategory } });
      });
    }
    else if(this.productCategory=="Kulaklık"){
      
 this.earPhoneService.updateDataById(this.productId,this.earPhoneModel).subscribe((result) => {
        alert("Ürün güncellendi ");

        this.router.navigate(['/admin'],{ queryParams: { category: this.productCategory } });
      });
      

    }
  }

}
