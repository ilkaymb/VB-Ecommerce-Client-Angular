import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import {
  CategoryService,
  CustomerService,
  DataService,
  EarPhoneService,
} from 'src/services/data.services';
import { DynamicDataService } from 'src/services/dynamicData.services';
import { LogService } from 'src/services/log.service';
@Component({
  selector: 'app-product-update-page',
  templateUrl: './product-update-page.component.html',
  styleUrls: ['./product-update-page.component.css'],
})
export class ProductUpdatePageComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dynamicDataService: DynamicDataService,
    private cookieService: CookieService,
    private logService: LogService
  ) {}

  productName: string = '';
  productId: string = '';
  productCategory: string = '';
  productModel: any;
  types: any[] = [];
  filteredOptions!: Observable<string[]>;
  selectedProduct: string = 'computer'; // Seçilen ürünü saklamak için değişken
  product: any;
  options: string[] = [];
  currentCategory: string = 'computer';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const category = params['productCategory'];
      const product_id = params['productId'];
      this.productId = product_id;
      this.currentCategory = category;
      console.log(category);
      if (category !== null) {
        this.dynamicDataService
          .getTableColumns(this.currentCategory)
          .subscribe((result) => {
            console.log(result);
            this.types = result;
          });
      }
      if (this.productId !== null) {
        this.dynamicDataService
          .getSingleData(this.currentCategory, this.productId)
          .subscribe((result) => {
            console.log(result);
            this.productModel = result;
          });
      }
    });
  }
  updateProduct() {
    this.dynamicDataService
      .updateData(this.currentCategory, this.productId, this.productModel)
      .subscribe((result) => {});
    alert('Ürün güncellendi ');
    const userId: number = parseInt(this.cookieService.get('userId'));

    this.logService
      .addLog({
        userType: 'admin',
        userName: userId.toString(),
        action: 'Update Product',
        description: `User with ID ${userId} update product for product category  ${this.currentCategory} product id ${this.productId}`,
        errorDetails: '',
      })
      .subscribe((res) => {
        console.log(res);
        // Log kaydı eklenme durumunda burada yapılması gereken işlemler
      });
    this.router.navigate(['/admin'], {
      queryParams: { category: this.currentCategory },
    });
  }

  getFieldType(type: string): string {
    if (type.includes('int')) {
      return 'number';
    } else if (type.includes('decimal')) {
      return 'number';
    } else {
      return 'text';
    }
  }
}
