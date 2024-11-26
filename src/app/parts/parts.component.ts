import { Component, OnInit } from '@angular/core';
import { PartService } from '../Services/PartsService/part.service';
import { Part } from '../modele/parts';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})
export class PartsComponent implements OnInit {
  parts: Part[] = [];
  partsFinal: Part[] = [];
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

  constructor(private partService: PartService) {}

  ngOnInit(): void {
    this.partService.GetAllParts().subscribe({
      next: (value) => {
        this.parts = value.map(part => {
          const category = this.categories.find(c => c.id === part.categoryId);
          return { ...part, categoryName: category ? category.name : 'Unknown' };
        });
        this.partsFinal = [...this.parts];
        this.filterParts();
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Done'),
    });
  }

  set text(query: string) {
    this.filterParts(query);
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.filterParts();
  }

  private filterParts(query: string = ''): void {
    let filteredParts = [...this.partsFinal];

    if (this.selectedCategory) {
      filteredParts = filteredParts.filter(part => part.categoryName.toLowerCase() === this.selectedCategory.toLowerCase());
    }

    if (query.trim()) {
      filteredParts = filteredParts.filter(part =>
        part.name.toLowerCase().includes(query.toLowerCase()) ||
        part.categoryName.toLowerCase().includes(query.toLowerCase())
      );
    }

    this.parts = filteredParts;
  }

  addToBuild(part: Part): void {
    console.log('Part added to build:', part);
  }
}
