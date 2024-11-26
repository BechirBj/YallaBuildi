import { Component } from '@angular/core';
import { PrebuiltService } from '../Services/PrebuiltService/prebuilt.service';
import { Router } from '@angular/router';
import { PreBuilt } from '../modele/prebuilt';

@Component({
  selector: 'app-prebuilt',
  templateUrl: './prebuilt.component.html',
  styleUrl: './prebuilt.component.css'
})
export class PrebuiltComponent {
  constructor(
    private PrebuiltService: PrebuiltService,
    private router : Router,
  ){}
  PrebuiltPcs:PreBuilt[]=[];

  ngOnInit(): void {
    this.PrebuiltService.GetallPreBuilt().subscribe({
      next: (prebuilt) => {
        this.PrebuiltPcs = prebuilt;
        console.log(this.PrebuiltPcs);
      },
      error: (error) => {
        console.error('Error fetching prebuilt data', error);
      },complete() {
          console.log('Prebuilt data fetched successfully');
      },
    })
  }

}
