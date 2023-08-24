import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
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

}
