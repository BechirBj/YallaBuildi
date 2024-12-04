import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartService } from '../Services/PartsService/part.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpart',
  templateUrl: './addpart.component.html',
  styleUrls: ['./addpart.component.css']
})
export class AddpartComponent implements OnInit {
  partForm!: FormGroup;

  categories: any[] = [
    { id: 1, name: 'CPU' },
    { id: 2, name: 'GPU' },
    { id: 3, name: 'RAM' },
    { id: 4, name: 'Storage' },
    { id: 5, name: 'MotherBoard' },
    { id: 6, name: 'PSU' },
    { id: 7, name: 'Case' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private partsService: PartService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.partForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      brand: ['', [Validators.required]],
      imageUrl: [''],
      description: ['']
    });
  }


  onSubmit() {
    if (this.partForm.invalid) {
      return;
    }

    const newPart = this.partForm.value;

    this.partsService.AddPart(newPart).subscribe(
      (response) => {
        alert('Part added successfully!');
        console.log(response);
        this.partForm.reset();  
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error adding part:', error);
        alert('There was an error adding the part. Please try again.');
      }
    );
  }
}
