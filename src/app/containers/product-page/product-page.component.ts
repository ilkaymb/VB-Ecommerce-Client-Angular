import { Component } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
product =  {
  "name": "Ürün 1",
  "price": 1500,
  "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, corrupti.",
  "imageUrl": "/assets/entrance-image.svg"
}
}
