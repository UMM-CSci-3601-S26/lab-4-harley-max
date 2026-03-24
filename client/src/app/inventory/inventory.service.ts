// Angular Imports
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// RxJS Imports
import { Observable } from 'rxjs';

// Inventory Imports
import { Inventory } from './inventory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private httpClient = inject(HttpClient);

  readonly inventoryUrl: string = `${environment.apiUrl}inventory`;

  private readonly itemKey = 'item';
  private readonly descriptionKey = 'description';
  private readonly brandKey = 'brand';
  private readonly colorKey = 'color';
  private readonly countKey = 'count';
  private readonly sizeKey = 'size';
  private readonly typeKey = 'type';
  private readonly materialKey = 'material';
  private readonly quantityKey = 'quantity';
  private readonly notesKey = 'notes';

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

  getInventory(filters?: {item?: string; description?: string; brand?: string; color?: string;
    count?: number; size?: string; type?: string; material?: string; quantity?: number; notes?: string}): Observable<Inventory[]> {

    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.item) {
        httpParams = httpParams.set(this.itemKey, filters.item);
      }
      if (filters.brand) {
        httpParams = httpParams.set(this.brandKey, filters.brand);
      }
      if (filters.color) {
        httpParams = httpParams.set(this.colorKey, filters.color);
      }
      if (filters.size) {
        httpParams = httpParams.set(this.sizeKey, filters.size);
      }
      if (filters.type) {
        httpParams = httpParams.set(this.typeKey, filters.type);
      }
      if (filters.material) {
        httpParams = httpParams.set(this.materialKey, filters.material);
      }

    }
    return this.httpClient.get<Inventory[]>(this.inventoryUrl, { params: httpParams });
  }
}
