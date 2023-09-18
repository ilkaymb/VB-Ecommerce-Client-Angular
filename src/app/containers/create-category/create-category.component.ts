import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DynamicTableService } from 'src/services/data.services';
import { LogService } from 'src/services/log.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent {
  constructor(
    private dynamicTableService: DynamicTableService,
    private cookieService: CookieService,
    private logService: LogService
  ) {}

  dataTypes = [
    'TINYINT',
    'SMALLINT',
    'MEDIUMINT',
    'INT',
    'BIGINT',
    'DECIMAL',
    'NUMERIC',
    'FLOAT',
    'DOUBLE',
    'CHAR',
    'VARCHAR(255)',
    'TEXT',
    'BLOB',
    'DATE',
    'TIME',
    'DATETIME',
    'TIMESTAMP',
  ];

  secilenVeriTipi: string | null = null;
  altVeriTipleri: string[] = [];

  veriTipiSecimleri: VeriTipiSecim[] = [
    { name: 'brand', type: 'VARCHAR(255)' },
    { name: 'model', type: 'VARCHAR(255)' },
    { name: 'price', type: 'DECIMAL' },
    { name: 'image_path', type: 'VARCHAR(255)' },
  ];

  tableName: string | null = null;

  onAltVeriTipiSecildi(): void {
    // Alt veri tipi seçildiğinde çağrılır.

    console.log(this.veriTipiSecimleri);
  }

  dataControlFunction(): void {
    // Alt veri tipi seçildiğinde çağrılır.
    console.log(this.veriTipiSecimleri);
  }

  gonderVeriyi() {
    const data = {
      tableName: this.tableName,
      columnDefinitions: this.veriTipiSecimleri,
    };
    console.log(data);

    this.dynamicTableService.postData(data).subscribe(
      (response) => {
        // İstek başarılı olduğunda burada işlemler yapabilirsiniz.
        console.log('İstek başarılı:', response);
        const userId: number = parseInt(this.cookieService.get('userId'));

        this.logService
          .addLog({
            userType: 'admin',
            userName: userId.toString(),
            action: 'Create Category',
            description: `User with ID ${userId} create category for category name ${this.tableName}`,
            errorDetails: '',
          })
          .subscribe((res) => {
            console.log(res);
            // Log kaydı eklenme durumunda burada yapılması gereken işlemler
          });
      },
      (error) => {
        // Hata durumunda burada işlemler yapabilirsiniz.
        console.error('İstek hatası:', error);
      }
    );
  }

  ekleVeriTipiSecimi(): void {
    const yeniSecim = new VeriTipiSecim();
    this.veriTipiSecimleri.push(yeniSecim);
  }
  silVeriTipiSecimi(index: number): void {
    this.veriTipiSecimleri.splice(index, 1);
  }

  inputIsEmpty(): boolean {
    console.log(
      this.veriTipiSecimleri.some(
        (secim) => secim.name === null || secim.type === null
      )
    );
    return this.veriTipiSecimleri.some(
      (secim) => secim.name === null || secim.type === null
    );
  }
}

export class VeriTipiSecim {
  name: string | null = null;
  type: string | null = null;
}
