import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, EarPhoneService } from 'src/services/data.services';
import { DynamicDataService } from 'src/services/dynamicData.services';
import { LogService } from 'src/services/log.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.css'],
})
export class AdminScreenComponent {
  searchedProducts: string = '';

  @Input() currentProducts: any[] = []; // @Input dekoratörü ile gelen veriyi saklamak için dizi
  @Input() currentCategory: string = '';
  @Input() options: Array<string> = [];
  @Input() searchbarPlaceholder: string = '';
  @Input() AdminPanelHeader: string = '';

  searchedProduct = '';

  searchProductFun(newSearch: string) {
    this.searchedProduct = newSearch;
  }

  changeCurrentCategory(newCurrentCategory: string) {
    this.currentCategory = newCurrentCategory;
  }

  value = '';
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  @Input() length: any;
  pageSize = 16;
  pageIndex = 0;
  pageSizeOptions = [16, 24, 32];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  getProduction() {
    const searchTextRegex = new RegExp(this.searchedProduct, 'i');
    return this.currentProducts
      .slice(
        this.pageIndex * this.pageSize,
        (this.pageIndex + 1) * this.pageSize
      )
      .filter((product) => {
        return (
          searchTextRegex.test(product.model) ||
          searchTextRegex.test(product.brand)
        );
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
  constructor(
    private dataService: DataService,
    private ear: EarPhoneService,
    private router: Router,
    private dynamicDataService: DynamicDataService,
    private logService: LogService,
    private cookieService: CookieService
  ) {}

  productUpdateButtonClick(productCategory: any, productId: any) {
    this.router.navigate(['/ürün-güncelle'], {
      queryParams: { productCategory: productCategory, productId: productId },
    });
  }
  deleteButtonClick(productCategory: string, productId: number) {
    var onay = confirm('Bu ürünü silmek istediğinizden emin misiniz?');

    // Kullanıcı "OK" düğmesine tıklarsa, silme işlemi gerçekleştirilir.
    if (onay) {
      this.dynamicDataService
        .deleteData(productCategory, productId)
        .subscribe((result) => {
          this.currentProducts = this.currentProducts.filter(
            (user) => user.id !== productId
          );
          alert('ürün silindi');
        });
      const userId: number = parseInt(this.cookieService.get('userId'));

      this.logService
        .addLog({
          userType: 'admin',
          userName: userId.toString(),
          action: 'Remove Product',
          description: `User with ID ${userId} remove product for product category ${this.currentCategory} product ID ${productId}`,
          errorDetails: '',
        })
        .subscribe((res) => {
          console.log(res);
          // Log kaydı eklenme durumunda burada yapılması gereken işlemler
        });
    } else {
      // Kullanıcı "İptal" düğmesine tıklarsa, silme işlemi iptal edilir.
      alert('Ürün silme işlemi iptal edildi.');
    }
  }
}
