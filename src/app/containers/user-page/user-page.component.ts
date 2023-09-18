import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CategoryService, LikeService } from 'src/services/data.services';
import { DynamicDataService } from 'src/services/dynamicData.services';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {
  constructor(
    private route: ActivatedRoute,
    private likeService: LikeService,
    private cookieService: CookieService,
    private categoryService: CategoryService,
    private dynamicDataService: DynamicDataService
  ) {}

  customerName: string = '';
  userId: number = parseInt(this.cookieService.get('userId'));
  options: string[] = [];
  currentCategory = '';
  currentProducts: any;
  productCount: any;
  categoryId: number = 0;
  categoriesJson: any;
  userLikes: any;
  ngOnInit(): void {
    // Kategori verilerini al
    this.categoryService.getData().subscribe((result) => {
      this.categoriesJson = result;
      this.options = result.map((element: any) => element.categoryName);
      console.log(this.options);

      // URL'den "category" parametresini al
      this.route.queryParams.subscribe((params) => {
        const category = params['category'];
        this.currentCategory = category;

        // Kategori ID'sini bul
        for (const categoryItem of this.categoriesJson) {
          if (this.currentCategory === categoryItem.categoryName) {
            this.categoryId = categoryItem.categoryId;
            console.log(this.categoryId);
            break;
          }
        }

        // Ürünleri getir
        if (category !== null) {
          this.likeService
            .getUserLikes(this.userId, this.categoryId, this.currentCategory)
            .subscribe((result) => {
              this.currentProducts = result;
              this.productCount = this.currentProducts.length;
            });
        } else {
          this.currentProducts = [];
          this.productCount = 0;
        }
      });
      // Kullanıcı beğenilerini kontrol et
      if (this.cookieService.check('customerToken')) {
        this.userId = parseInt(this.cookieService.get('userId'));
        this.likeService
          .getUserLikes(this.userId, this.categoryId, this.currentCategory)
          .subscribe((result) => {
            this.userLikes = result;
          });
      } else {
        this.userLikes = [];
      }
    });
  }
}
