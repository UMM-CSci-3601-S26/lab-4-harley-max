import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private readonly quantityKey = 'quantity';
  private readonly propertiesKey = 'properties';

  getInventory(filters?: { item?: string; description?: string; quantity?: number; properties?: string[] }): Observable<Inventory[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.item) {
        httpParams = httpParams.set(this.itemKey, filters.item);
      }
      // Filters will come into play on the next branch and pull request
      // if (filters.description) {
      //   httpParams = httpParams.set(this.descriptionKey, filters.description);
      // }
      // if (filters.quantity !== undefined) {
      //   httpParams = httpParams.set(this.quantityKey, filters.quantity.toString());
      // }
      // if (filters.properties && filters.properties.length > 0) {
      //   httpParams = httpParams.set(this.propertiesKey, filters.properties.join(','));
      // }
    }
    return this.httpClient.get<Inventory[]>(this.inventoryUrl, { params: httpParams });
  }
}
