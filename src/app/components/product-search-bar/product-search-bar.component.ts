import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-product-search-bar',
  templateUrl: './product-search-bar.component.html',
  styleUrls: ['./product-search-bar.component.css'],
  standalone:true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,MatIconModule,MatButtonModule,MatSelectModule
  ],
  
})
export class ProductSearchBarComponent implements OnInit {
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  @Input()options:Array<string>=[];
  @Input()currentCategory:string="";

  @Input()searchbarPlaceholder:string="";
@Output() newSearchEvent = new EventEmitter<string>();
@Output() newItemEvent = new EventEmitter<string>();
@Output() newCurrentCategory = new EventEmitter<string>();

value=""
searchString=""
addNewItem(value: string) {
  this.newItemEvent.emit(value);
}

searchedProductFunction(value:string){
  this.newSearchEvent.emit(value);
}

onChange(value: any) {
  this.newSearchEvent.emit(this.searchString);
}
constructor(
  private route: ActivatedRoute,
  private router: Router) { }



  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  onProductSelect(event: any) {
    // Seçilen ürünü değişkene atama
    this.newCurrentCategory.emit(event.value);
    console.log(event.value)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: event.value },
      queryParamsHandling: 'merge'
    });

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

 

}
