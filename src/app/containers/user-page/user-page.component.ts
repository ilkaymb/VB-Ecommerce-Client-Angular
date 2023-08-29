import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/services/data.services';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  constructor(private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) {}
 
    customerName: string = '';
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const customerName = params['customer'];
      if (customerName!=null) {
        this.customerService.register(customerName).subscribe((result) => {
          this.customerName=result.username;
          console.log(result);
        });
      }
      else{
        this.router.navigate(['/login']);
      }
 
    });


  }

}
