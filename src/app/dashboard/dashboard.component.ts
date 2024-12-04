import { Component } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { Router } from '@angular/router';
import { PartService } from '../Services/PartsService/part.service';
import { PrebuiltService } from '../Services/PrebuiltService/prebuilt.service';
import { Part } from '../modele/parts';
import { PreBuilt } from '../modele/prebuilt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private partsService: PartService,
    private prebuiltServices: PrebuiltService
  ) {}

  IsLoggedIn: boolean = false;
  email: any;
  parts: Part[] = [];
  PrebuiltPcs: PreBuilt[] = [];

  categories: any[] = [
    { id: 1, name: 'CPU' },
    { id: 2, name: 'GPU' },
    { id: 3, name: 'RAM' },
    { id: 4, name: 'Storage' },
    { id: 5, name: 'MotherBoard' },
    { id: 6, name: 'PSU' },
    { id: 7, name: 'Case' }
  ];
  
  selectedCategory: string = '';
  filteredParts: Part[] = [];

  check() {
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.IsLoggedIn = loggedIn;
      const userData = localStorage.getItem('User');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        this.email = parsedUser.email;
        if (this.email !== "bechir@gmail.com") {
          alert("Url is Forbidden !");
          this.router.navigate(['/home']);
        }
      }
    });
  }

  ngOnInit() {
    this.check();
    this.partsService.GetAllParts().subscribe((parts) => {
      this.parts = parts;
      this.filteredParts = parts; 
    });
    this.prebuiltServices.GetallPreBuilt().subscribe((prebuilts) => {
      this.PrebuiltPcs = prebuilts;
    });
  }

  activeTab: 'parts' | 'prebuilt' = 'parts';

  setActiveTab(tab: 'parts' | 'prebuilt') {
    this.activeTab = tab;
  }

  openAddPartModal() {
    alert('Open Add Part Modal');
  }

  editPart(part: any) {
    alert(`Edit Part: ${JSON.stringify(part)}`);
  }

  deletePart(partId: any) {
    this.partsService.DeletePart(partId).subscribe(
      (response) => {
        this.parts = this.parts.filter((part) => part.id !== partId);
  
        this.filterPartsByCategory();
      },
      (error) => {
        console.error('Error deleting part:', error);
        alert('There was an error deleting the part. Please try again.');
      }
    );
  }
  



  deletePrebuilt(prebuiltId: number): void {
    this.prebuiltServices.DeletePreBuilt(prebuiltId).subscribe({
      next: (response) => {
        console.log('Prebuilt item deleted successfully', response);
        this.prebuiltServices.GetallPreBuilt().subscribe((prebuilts) => {
          this.PrebuiltPcs = prebuilts;
        });
      },
      error: (err) => {
        console.error('Error deleting prebuilt item', err);
      }
    });
  }

  filterPartsByCategory() {
    if (this.selectedCategory === '') {
      this.filteredParts = this.parts; 
    } else {
      this.filteredParts = this.parts.filter(part => part.categoryName === this.selectedCategory);
    }
  }
}
