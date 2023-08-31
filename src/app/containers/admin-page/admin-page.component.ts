import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.services';
import { EarPhoneService } from 'src/services/data.services';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  
})
export class AdminPageComponent implements OnInit{
  constructor(private dataService: DataService,
    private ear:EarPhoneService,
    private route: ActivatedRoute,
    private router: Router) { }

  options: string[] = ['Bilgisayar', 'Kulaklık', 'Playstation','Xbox'];
  currentCategory: string="Bilgisayar";
 currentProducts:any;
 productCount:any;

 ngOnInit(): void {
   this.route.queryParams.subscribe(params => {
     const category = params['category'];
 
     if (category === 'Bilgisayar') {
       this.dataService.getData().subscribe((result) => {
         this.currentProducts=result;
         this.productCount=this.currentProducts.length;
       });
     } else if (category === 'Kulaklık') {
         this.ear.getData().subscribe((result) => {
         this.currentProducts=result;
         this.productCount=this.currentProducts.length;
       });
     }
     else{
       this.currentProducts=[]
     }
 
     this.productCount = this.currentProducts.length;
   });
 }

}
