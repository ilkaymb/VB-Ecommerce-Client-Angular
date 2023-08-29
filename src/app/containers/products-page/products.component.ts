import { Component, Input } from '@angular/core';
import { DataService } from 'src/services/data.services';
import { EarPhoneService } from 'src/services/data.services';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

   options: string[] = ['Bilgisayar', 'Kulaklık', 'Playstation','Xbox'];
   currentCategory: string="Bilgisayar";


  data: any; // Verileri saklayacak değişken

  constructor(private dataService: DataService,private ear:EarPhoneService,
    private route: ActivatedRoute,
    private router: Router) { }
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
/*
  ngOnInit(): void {
    this.dataService.getData().subscribe((result) => {
      this.currentProducts=result;
      this.productCount=this.currentProducts.length;
    });
  }
*/