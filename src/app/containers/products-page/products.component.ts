import { Component, Input } from '@angular/core';
import { DataService, LikeService } from 'src/services/data.services';
import { EarPhoneService } from 'src/services/data.services';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/services/localStorage.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

   options: string[] = ['Bilgisayar', 'Kulaklık', 'Playstation','Xbox'];
   currentCategory: string="Bilgisayar";


  data: any; // Verileri saklayacak değişken

  constructor(private dataService: DataService,private ear:EarPhoneService,private likeService:LikeService,private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router) { }
  currentProducts:any;
  productCount:any;

 
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
   userId:number=0;

   productCategoryId=this.productIdFunction();
  userLikes:any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
  
      if (category === 'Bilgisayar') {
        this.dataService.getData().subscribe((result) => {
          this.currentProducts=result;
          this.productCount=this.currentProducts.length;
        });
        if(this.cookieService.check('customerToken')){
          this.userId=parseInt(this.cookieService.get('userId'));
          
        this.likeService.getUserLikes(this.userId,this.productCategoryId).subscribe((result) => {
        
            this.userLikes=result;

          
        

        });
      }
      else{
        this.userLikes=[]
      }
      } else if (category === 'Kulaklık') {
          this.ear.getData().subscribe((result) => {
          this.currentProducts=result;
          this.productCount=this.currentProducts.length;
          if(this.cookieService.check('customerToken')){
            this.userId=parseInt(this.cookieService.get('userId'));
            
          this.likeService.getUserLikes(this.userId,this.productCategoryId).subscribe((result) => {
          
              this.userLikes=result;
  
            
          
  
          });
        }
        else{
          this.userLikes=[]
        }
        });
      }
      else{
        this.currentProducts=[]
      }
  
      this.productCount = this.currentProducts.length;
    });
  }

}
