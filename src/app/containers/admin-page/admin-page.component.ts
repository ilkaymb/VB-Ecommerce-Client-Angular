import { Component, OnInit } from '@angular/core';
import { CategoryService, DataService } from 'src/services/data.services';
import { EarPhoneService } from 'src/services/data.services';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DynamicDataService } from 'src/services/dynamicData.services';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  
})
export class AdminPageComponent implements OnInit{
  constructor(private dynamicDataService: DynamicDataService,
    private categoryService:CategoryService,
    private route: ActivatedRoute,
    private router: Router) { }

  options: string[] = [];
  currentCategory: string="";
 currentProducts:any;
 productCount:any;

 ngOnInit(): void {

  this.categoryService.getData().subscribe((result) => {
    this.options = result.map((element: any) => element.categoryName);
  });

      this.route.queryParams.subscribe(params => {
        const category = params['category'];
        this.currentCategory=category;
  
        if (category !== null) {
          this.dynamicDataService.getAllData( this.currentCategory).subscribe((result) => {
          
            this.currentProducts = result;
            this.productCount = this.currentProducts.length;}
          );
  
        }  else {
          this.currentProducts = [];
          this.productCount = 0;
        }
  
      });
  
    }
  

}
