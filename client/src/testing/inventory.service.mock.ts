import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Inventory } from '../app/inventory/inventory';
import { InventoryService } from 'src/app/inventory/inventory.service';

@Injectable({
  providedIn: AppComponent
})

export class MockInventoryService implements Pick<InventoryService, 'getInventory'> {
  static testInventory: Inventory[] = [
    {
      item: "Markers",
      description: "8 Pack of Washable Wide Markers",
      brand: "Crayola",
      color: "N/A",
      count: 8,
      size: "Wide",
      type: "Washable",
      material: "N/A",
      quantity: 0,
      notes: "N/A"
    },
    {
      item: "Folder",
      description: "Red 2 Prong Plastic Pocket Folder",
      brand: "N/A",
      color: "Red",
      count: 1,
      size: "N/A",
      type: "2 Prong",
      material: "Plastic",
      quantity: 0,
      notes: "N/A"
    },
    {
      item: "Notebook",
      description: "Yellow Wide Ruled Spiral Notebook",
      brand: "Five Star",
      color: "Yellow",
      count: 1,
      size: "Wide Ruled",
      type: "Spiral",
      material: "N/A",
      quantity: 0,
      notes: "N/A"
    }
  ];

  itemOptions = [
    { value: 'pencil', label: 'Pencils' },
    { value: 'colored pencil', label: 'Colored Pencils' },
    { value: 'sharpener', label: 'Sharpeners' },
    { value: 'marker', label: 'Markers' },
    { value: 'highlighter', label: 'Highlighters' },
    { value: 'crayon', label: 'Crayons' },
    { value: 'pen', label: 'Pens' },
    { value: 'eraser', label: 'Erasers' },
    { value: 'folder', label: 'Folders' },
    { value: 'binder', label: 'Binders' },
    { value: 'notebook', label: 'Notebooks' },
    { value: 'glue', label: 'Glue' },
    { value: 'ruler', label: 'Rulers' },
    { value: 'scissors', label: 'Scissors' },
    { value: 'headphones', label: 'Headphones' },
    { value: 'backpack', label: 'Backpacks' },
    { value: 'box', label: 'Boxes' },
    { value: 'calculator', label: 'Calculators' },
    { value: 'tissue', label: 'Tissues' },
    { value: 'water bottle', label: 'Water Bottle' },
    { value: 'wipe', label: 'Wipes' },
    { value: 'other', label: 'Other' }
  ];

  brandOptions = [
    { value: 'Kleenex', label: 'Kleenex' },
    { value: 'Sharpie', label: 'Sharpie' },
    { value: 'Texas Instruments', label: 'Texas Instruments' },
    { value: 'Ticonderoga', label: 'Ticonderoga' },
    { value: 'Crayola', label: 'Crayola' },
    { value: 'Clorox', label: 'Clorox' },
    { value: 'Expo', label: 'Expo' },
    { value: 'Elmer', label: 'Elmers' },
    { value: 'Lysol', label: 'Lysol' },
    { value: 'Puffs', label: 'Puffs' },
    { value: 'other', label: 'Other' }
  ];

  colorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'orange', label: 'Orange' },
    { value: 'green', label: 'Green' },
    { value: 'purple', label: 'Purple' },
    { value: 'black', label: 'Black' },
    { value: 'other', label: 'Other' }
  ];

  /* eslint-disable @typescript-eslint/no-unused-vars */
  getInventory(_filters: { item?: string, brand?: string, color?: string, size?: string, type?: string, material?: string }): Observable<Inventory[]> {
    return of(MockInventoryService.testInventory);
  }
}
