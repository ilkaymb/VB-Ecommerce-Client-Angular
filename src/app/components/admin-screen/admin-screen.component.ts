import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Input, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, EarPhoneService } from 'src/services/data.services';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.css'],
})
export class AdminScreenComponent {
  products=[
    {
      "name": "Ürün 1",
      "price": 1500,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, corrupti.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Ürün 2",
      "price": 2000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, expedita.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Ürün 3",
      "price": 750,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, nemo.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Ürün 4",
      "price": 3000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, veniam.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Ürün 5",
      "price": 12000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, laboriosam.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Ürün 6",
      "price": 500,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, dolorum.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Ürün 7",
      "price": 9000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, deserunt.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Ürün 8",
      "price": 2700,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, ullam.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Ürün 9",
      "price": 18000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, molestiae.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Ürün 10",
      "price": 400,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, ad.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Ürün 11",
      "price": 8000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, eveniet.",
      "imageUrl": "/assets/entrance-image.svg"
    },
    {
      "name": "Ürün 12",
      "price": 6000,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, exercitationem.",
      "imageUrl": "/assets/entrance-image.svg"
    }
  ];

  searchedProducts:string="";

  @Input() currentProducts: any[] = []; // @Input dekoratörü ile gelen veriyi saklamak için dizi
  @Input()currentCategory:string="Bilgisayar";
  @Input()options:Array<string>=[];
  searchedProduct=""

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
  constructor(private dataService: DataService,private ear:EarPhoneService,
private router: Router) { }

  productUpdateButtonClick(productCategory:any,productId:any){
    this.router.navigate(['/ürün-güncelle'],{ queryParams: {productCategory:productCategory, productId: productId } });

  }
  deleteButtonClick(productCategory:string,productId:number){
   var onay = confirm("Bu ürünü silmek istediğinizden emin misiniz?");
    
   // Kullanıcı "OK" düğmesine tıklarsa, silme işlemi gerçekleştirilir.
   if (onay) {
      if(productCategory=="Bilgisayar"){
        this.dataService.deleteDataById(productId).subscribe((result) => {
          this.currentProducts = this.currentProducts.filter((user) => user.id !== productId);
          alert("ürün silindi")
          });
      }
      else if(productCategory=="Kulaklık"){
        this.ear.deleteDataById(productId).subscribe((result) => {    
          this.currentProducts = this.currentProducts.filter((user) => user.id !== productId);

          alert("ürün silindi")
        });
      }
      else{
        alert("Kategori Seçilemedi")
      }

    
   } else {
       // Kullanıcı "İptal" düğmesine tıklarsa, silme işlemi iptal edilir.
       alert("Ürün silme işlemi iptal edildi.");
   }
  }
     /*
      if(productCategory!=null){
        if(productCategory=="Bilgisayar"){
          var onay = confirm("Bu ürünü silmek istediğinizden emin misiniz?");
    
          // Kullanıcı "OK" düğmesine tıklarsa, silme işlemi gerçekleştirilir.
          if (onay) {
            if (productId!=null) {
              this.dataService.deleteDataById(productId).subscribe((result) => {
              alert("ürün silindi")
              });
            }

           
          } else {
              // Kullanıcı "İptal" düğmesine tıklarsa, silme işlemi iptal edilir.
              alert("Ürün silme işlemi iptal edildi.");
          }
        
        }
        else if(productCategory=="Kulaklık"){
          var onay = confirm("Bu ürünü silmek istediğinizden emin misiniz?");
    
          // Kullanıcı "OK" düğmesine tıklarsa, silme işlemi gerçekleştirilir.
          if (onay) {
            if (productId!=null) {
              this.ear.deleteDataById(productId).subscribe((result) => {
               
                alert("ürün silindi")
              });
            }
      
          } else {
              // Kullanıcı "İptal" düğmesine tıklarsa, silme işlemi iptal edilir.
              alert("Ürün silme işlemi iptal edildi.");
          }
  
        }
      }
  */
  
  }

