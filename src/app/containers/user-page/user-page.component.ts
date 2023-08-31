import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LikeService } from 'src/services/data.services';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  constructor(private route: ActivatedRoute,
    private likeService:LikeService,
    private cookieService: CookieService) {}
 
    customerName: string = '';
    productCategoryId:number=1;
    userId:number=parseInt(this.cookieService.get('userId'));
    options: string[] = ['Bilgisayar', 'Kulaklık', 'Playstation','Xbox'];
    currentCategory="Bilgisayar"
    userLikes:any;

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
      const category = params['category'];
      this.productCategoryId=this.productIdFunction(category);

        this.likeService.getUserLikes(this.userId,this.productCategoryId).subscribe((result) => {
         this.userLikes=result;
        });
    });


  }

}
