import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

// Dummy data just to see what the table is going to look like, will need to be removed in the future for the actual inventory data
export interface dummyInventoryData {
  item: string,
  description: string,
  brand: string,
  color:string,
  size: string,
  type: string,
  material:string,
  count: number,
  quantity: number,
  notes: string
}

const DUMMY_DATA: dummyInventoryData[] = [
  {item: 'pencil', description: 'yellow pencil', brand: 'up&up', color: 'yellow', size: 'regular', type: '#2', material: 'N/A', count: 10, quantity: 2, notes: 'N/A'},
  {item: 'folder', description: 'green plastic pocket folder', brand: 'five star', color: 'green', size: 'regular', type: 'pocket', material: 'plastic', count: 1, quantity: 20, notes: 'N/A'},
];

@Component({
  selector: 'app-inventory',
  imports: [MatTableModule, MatCardModule, MatSortModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})

export class InventoryComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['item', 'description', 'brand', 'color', 'size', 'type', 'material', 'quantity', 'count', 'notes'];
  dataSource = new MatTableDataSource(DUMMY_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
