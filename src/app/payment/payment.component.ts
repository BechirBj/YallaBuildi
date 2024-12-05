import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  PC: any = {};
  totalPrice: number = 0;
  categories: string[] = [
    'CPU',
    'GPU',
    'RAM',
    'Storage',
    'MotherBoard',
    'PSU',
    'Case',
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['selectedParts']) {
        this.PC = JSON.parse(params['selectedParts']);
      }
      this.totalPrice = params['totalPrice'];
      console.log('Selected Parts:', this.PC);
      console.log('Total Price:', this.totalPrice);
    });
  }

  processPayment() {
    console.log('Processing payment for:', this.PC, 'Total:', this.totalPrice);
    alert('Payment processed successfully!');
  }
}
