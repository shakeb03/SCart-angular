import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  displayedColumns: string[] = ['orderPrice', 'productName', 'userEmail'];
  dataSource: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getOrders().subscribe(
      orders => {
        this.dataSource = orders;
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

}
