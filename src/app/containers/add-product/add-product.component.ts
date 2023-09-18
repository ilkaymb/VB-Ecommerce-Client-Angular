import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, LikeService } from 'src/services/data.services';
import { DynamicDataService } from 'src/services/dynamicData.services';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LogService } from 'src/services/log.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  myControl = new FormControl('');

  options: string[] = [];
  currentCategory: string = 'computer';
  currentProducts: any;
  userId: number = 0;
  types: any[] = [];
  filteredOptions!: Observable<string[]>;
  selectedProduct: string = 'computer'; // Seçilen ürünü saklamak için değişken
  product: any;
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private dynamicDataService: DynamicDataService,
    private cookieService: CookieService,
    private logService: LogService
  ) {}
  ngOnInit(): void {
    this.categoryService.getData().subscribe((result) => {
      this.options = result.map((element: any) => element.categoryName);
    });

    this.dynamicDataService
      .getTableColumns(this.selectedProduct)
      .subscribe((result) => {
        console.log(result);
        this.types = result;
      });
  }

  onProductSelect(event: any) {
    // Seçilen ürünü değişkene atama
    this.selectedProduct = event.value;
    this.dynamicDataService
      .getTableColumns(this.selectedProduct)
      .subscribe((result) => {
        console.log(result);
        this.types = result;
      });
  }

  productData: any = {};
  submitForm() {
    const valuesOnly = this.types.filter((field) =>
      field.hasOwnProperty('value')
    );

    // types dizisi içindeki tüm verileri dolaşarak alabilirsiniz
    for (const field of valuesOnly) {
      this.productData[field.name] = field.value;
    }
    this.addProduct();
  }
  addProduct() {
    // Ürün ekleme işlemi burada gerçekleştirilebilir
    // Örneğin, bir servis aracılığıyla API'ye POST isteği gönderebilirsiniz
    this.dynamicDataService
      .addData(this.selectedProduct, this.productData)
      .subscribe((result) => {
        console.log(result);
      });
    const userId: number = parseInt(this.cookieService.get('userId'));

    this.logService
      .addLog({
        userType: 'admin',
        userName: userId.toString(),
        action: 'Add Product',
        description: `User with ID ${userId} add product for product category ${this.currentCategory} product name ${this.productData['model']}`,
        errorDetails: '',
      })
      .subscribe((res) => {
        console.log(res);
        // Log kaydı eklenme durumunda burada yapılması gereken işlemler
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
