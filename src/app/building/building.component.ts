import { Component, OnInit } from '@angular/core';
import { PartService } from '../Services/PartsService/part.service';
import { Part } from '../modele/parts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  parts: Part[] = [];
  categories: string[] = ['CPU', 'GPU', 'RAM', 'Storage', 'MotherBoard', 'PSU', 'Case'];
  selectedParts: { [key: string]: Part } = {};
  totalPrice = 0 ;
  constructor(private partService: PartService) {}

  ngOnInit(): void {
    this.partService.GetAllParts().subscribe({
      next: (value) => {
        this.parts = value;
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Done')
    });
  }

  filterPartsByCategory(category: string): Part[] {
    return this.parts.filter(part => part.categoryName === category);
  }

  selectPart(event: any, category: string): void {
    console.log('Category:', category);
    const partId = +event.target.value;
    console.log('Selected part ID:', partId);  
  
    if (isNaN(partId)) {
      console.error('Invalid partId:', partId);
      return;
    }
  
    this.partService.GetPartById(partId).subscribe({
      next: (selectedPart: Part) => {
        console.log('Selected Part:', selectedPart); 
        this.totalPrice += selectedPart.price;
        if (selectedPart) {

          this.selectedParts[category] = selectedPart;
          console.log('Selected parts:', this.selectedParts);
          console.log(this.totalPrice);
        } else {
          console.error('Part not found for ID:', partId);
        }
      },
      error: (err) => {
        console.error('Error fetching part:', err);
      }
    });
   
  }
  generatePDF() {
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(18);
    doc.text('Build Summary', 14, 20);
  
    // Define columns
    const columns = ['Image', 'Produit', 'Prix unitaire', 'Quantité', 'Total'];
  
    // Prepare rows with placeholders for images
    const rows = Object.values(this.selectedParts).map((part: Part) => [
      '', // Placeholder for image
      part.name,
      `${part.price} $$`,
      1,
      `${part.price} $$`
    ]);
  
    // Add table using autoTable
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 30,
      theme: 'grid',
      styles: {
        cellPadding: 5,
        fontSize: 10,
        minCellHeight: 20, // Set a minimum cell height
      },
      didDrawCell: async (data: any) => {
        if (data.column.index === 0 && data.row.index < rows.length) {
          const part = Object.values(this.selectedParts)[data.row.index];
          if (part.imageUrl) {
            try {
              // Check and convert unsupported image formats (like .avif) to base64
              let imageData = part.imageUrl;
  
              if (part.imageUrl.endsWith('.avif')) {
                imageData = await fetch(part.imageUrl)
                  .then((res) => res.blob())
                  .then((blob) =>
                    new Promise((resolve) => {
                      const reader = new FileReader();
                      reader.onloadend = () => resolve(reader.result as string);
                      reader.readAsDataURL(blob);
                    })
                  );
              }
  
              const imageHeight = 18; // Height of the image
              const imageWidth = 18; // Width of the image
              const padding = 2; // Padding inside the cell
  
              // Adjust row height to fit the image
              if (data.cell.height < imageHeight + padding) {
                data.cell.height = imageHeight + padding;
              }
  
              // Draw the image
              doc.addImage(
                imageData, // Image URL or base64
                'JPEG', // Format (change dynamically if needed)
                data.cell.x + padding, // X position
                data.cell.y + (data.cell.height - imageHeight) / 2, // Y position (vertically centered)
                imageWidth, // Width
                imageHeight // Height
              );
            } catch (err) {
              console.error('Error loading image:', err);
            }
          }
        }
      },
    });
  
    // Calculate and add total price
    const totalPrice = Object.values(this.selectedParts).reduce(
      (sum, part: Part) => sum + part.price,
      0
    );
    doc.setFontSize(14);
    doc.text(`Total: ${totalPrice.toFixed(3)} $$`, 14, (doc as any).lastAutoTable.finalY + 10);
  
    // Save the PDF
    doc.save('build-summary.pdf');
  }
  
}
