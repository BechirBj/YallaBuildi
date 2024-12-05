import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartService } from '../Services/PartsService/part.service';
import { Part } from '../modele/parts';
import { PrebuiltService } from '../Services/PrebuiltService/prebuilt.service';
import { PreBuilt } from '../modele/prebuilt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prebuild',
  templateUrl: './add-prebuild.component.html',
  styleUrls: ['./add-prebuild.component.css'],
})
export class AddPrebuildComponent implements OnInit {
  prebuildForm!: FormGroup;
  parts: Part[] = [];
  categories: { [key: string]: Part[] } = {};
  prebuiltPCs: PreBuilt[] = [];
  constructor(
    private fb: FormBuilder,
    private partService: PartService,
    private prebuiltService: PrebuiltService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeCategories();
    this.loadParts();
  }

  private initializeForm(): void {
    this.prebuildForm = this.fb.group({
      name: ['', Validators.required],
      cpu: ['', Validators.required],
      gpu: ['', Validators.required],
      motherboard: ['', Validators.required],
      psu: ['', Validators.required],
      ram: ['', Validators.required],
      storage: ['', Validators.required],
      case: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required]],
    });
  }

  private initializeCategories(): void {
    this.categories = {
      CPU: [],
      GPU: [],
      RAM: [],
      STORAGE: [],
      MOTHERBOARD: [],
      PSU: [],
      CASE: [],
    };
  }

  private loadParts(): void {
    this.partService.GetAllParts().subscribe({
      next: (parts) => {
        this.parts = parts;
        this.categorizeParts();
      },
      error: (error) => console.error('Error fetching parts:', error),
    });
  }

  private categorizeParts(): void {
    this.parts.forEach((part) => {
      const normalizedCategoryName = part.categoryName.toUpperCase();
      if (this.categories[normalizedCategoryName]) {
        this.categories[normalizedCategoryName].push(part);
      } else {
        console.warn(`Unknown category: ${part.categoryName}`);
      }
    });

    console.log('Categorized Parts:', this.categories);
  }

  onSubmit(): void {
    if (this.prebuildForm.valid) {
      const selectedPartIds = [
        this.prebuildForm.value.cpu,
        this.prebuildForm.value.gpu,
        this.prebuildForm.value.motherboard,
        this.prebuildForm.value.psu,
        this.prebuildForm.value.ram,
        this.prebuildForm.value.storage,
        this.prebuildForm.value.case,
      ];

      const selectedParts: Part[] = this.parts.filter((part) =>
        selectedPartIds.includes(part.id)
      );

      const newPreBuilt: PreBuilt = {
        name: this.prebuildForm.value.name,
        parts: selectedParts,
        totalPrice: selectedParts.reduce((sum, part) => sum + part.price, 0),
        description: this.prebuildForm.value.description,
        imageUrl: this.prebuildForm.value.imageUrl,
        id: 0,
      };

      console.log('New PreBuilt:', newPreBuilt);

      this.prebuiltService.AddPrebuilt(newPreBuilt).subscribe({
        next: () => {
          alert('Prebuilt PC added successfully!');
          this.prebuildForm.reset();
          this.router.navigate(['/dashboard']);
        },
        error: (error) => console.error('Error saving prebuilt:', error),
      });
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }
}
