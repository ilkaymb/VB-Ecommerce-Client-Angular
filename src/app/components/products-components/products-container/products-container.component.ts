import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent  implements OnInit {
  computer_products=[
    {
      "name": "Bilgisayar Model A",
      "price": 1500,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, corrupti.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Bilgisayar Model B",
      "price": 2000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, expedita.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Bilgisayar Model C",
      "price": 750,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, nemo.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Bilgisayar Model D",
      "price": 3000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, veniam.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Bilgisayar Model E",
      "price": 12000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, laboriosam.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Bilgisayar Model F",
      "price": 500,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, dolorum.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Bilgisayar Model G",
      "price": 9000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, deserunt.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Bilgisayar Model H",
      "price": 2700,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, ullam.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Bilgisayar Model I",
      "price": 18000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, molestiae.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Bilgisayar Model J",
      "price": 400,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, ad.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Bilgisayar Model K",
      "price": 8000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, eveniet.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Bilgisayar Model L",
      "price": 6000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, exercitationem.",
      "imageUrl": "/assets/entrance-image.svg"
    }
  ];

  headphone_products=[
    {
      "name": "Kulaklık Model A",
      "price": 1500,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, corrupti.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model B",
      "price": 2000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, expedita.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model C",
      "price": 750,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, nemo.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model D",
      "price": 3000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, veniam.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model E",
      "price": 12000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, laboriosam.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model F",
      "price": 500,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, dolorum.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model G",
      "price": 9000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, deserunt.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model H",
      "price": 2700,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, ullam.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model I",
      "price": 18000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, molestiae.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model J",
      "price": 400,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, ad.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model K",
      "price": 8000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, eveniet.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model L",
      "price": 6000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, exercitationem.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model M",
      "price": 2500,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, dolor.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model N",
      "price": 3500,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ratione.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model O",
      "price": 550,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, illum.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model P",
      "price": 700,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, soluta.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model Q",
      "price": 1600,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, rem.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model R",
      "price": 4500,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quam.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model S",
      "price": 8500,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, at.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model T",
      "price": 2100,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, laborum.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model U",
      "price": 1300,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, voluptas.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model V",
      "price": 300,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, id.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model W",
      "price": 9500,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, ducimus.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model X",
      "price": 2800,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, non.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model Y",
      "price": 4000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, laboriosam.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Kulaklık Model Z",
      "price": 7000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, quae.",
      "imageUrl": "/assets/entrance-image.svg"
    }
  ]
  ;

searchedProducts:string="";

  @Input() currentProducts: any[] = []; // @Input dekoratörü ile gelen veriyi saklamak için dizi
  @Input()currentCategory:string="";
  @Input()options:Array<string>=[];
  items = ['item1', 'item2', 'item3', 'item4'];
  message="selam"
  searchedProduct=""

  addItem(newItem: string) {
    this.items.push(newItem);
  }

  changeMessage(newMessage: string) {
    this.message = newMessage;
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

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  getProduction(){
    const searchTextRegex = new RegExp(this.searchedProduct, 'i'); 
    if (this.currentCategory === 'Bilgisayar') {
      return this.computer_products.filter(product => {
        return searchTextRegex.test(product.name) || searchTextRegex.test(product.description);
      });
    } else if (this.currentCategory === 'Kulaklık') {
      return this.headphone_products.filter(product => {
        return searchTextRegex.test(product.name) || searchTextRegex.test(product.description);
      });
    } else {
      return undefined;
    }
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
}
