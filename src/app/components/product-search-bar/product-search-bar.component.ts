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
    AsyncPipe,MatIconModule,MatButtonModule,
  ],
  
})
export class ProductSearchBarComponent implements OnInit {
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  @Input()options:Array<string>=[];

@Output() newSearchEvent = new EventEmitter<string>();
@Output() newItemEvent = new EventEmitter<string>();
@Output() newMessageEvent = new EventEmitter<string>();
@Output() newCurrentCategory = new EventEmitter<string>();

filterSelect="Bilgisayar"
value=""
searchString=""
addNewItem(value: string) {
  this.newItemEvent.emit(value);
}
changeMessage(message: string) {
  this.newMessageEvent.emit (message) ;
}
searchedProductFunction(value:string){
  this.newSearchEvent.emit(value);
}

onChange(value: any) {
  this.newSearchEvent.emit(this.searchString);
}

onChangeSelectProduct(value: string) { 
  this.newCurrentCategory.emit(this.filterSelect);

}

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

 

}