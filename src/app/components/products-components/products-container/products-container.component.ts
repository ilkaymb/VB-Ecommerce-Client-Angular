import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent  implements OnInit {

searchedProducts:string="";

  @Input() currentProducts: any[] = []; // @Input dekoratörü ile gelen veriyi saklamak için dizi
  @Input()currentCategory:string="Bilgisayar";
  @Input()options:Array<string>=[];
  items = ['item1', 'item2', 'item3', 'item4'];
  searchedProduct=""

  addItem(newItem: string) {
    this.items.push(newItem);
  }


  
  searchProductFun(newSearch:string){
      this.searchedProduct=newSearch;
    
  }

  changeCurrentCategory(newCurrentCategory:string){
    this.currentCategory=newCurrentCategory;
  }

  value=""
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;


  
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  @Input() length:any ;
  pageSize = 16;
  pageIndex = 0;
  pageSizeOptions = [16, 24, 32];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  getProduction(){
    const searchTextRegex = new RegExp(this.searchedProduct, 'i'); 
      return this.currentProducts.slice(this.pageIndex*this.pageSize, (this.pageIndex+1)*this.pageSize).filter(product => {
        return searchTextRegex.test(product.model) || searchTextRegex.test(product.brand);
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
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  constructor(private router: Router) {}

  productPageButtonClicked(productCategory:any,productId:any){
    this.router.navigate(['/ürün-sayfasi'],{ queryParams: {productCategory:productCategory, productId: productId } });

  }
}
