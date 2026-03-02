import { HttpClient, HttpParams, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Inventory } from './inventory';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  // A small test inventory
  const testInventory: Inventory[] = [
    {
      item: "Markers",
      description: "8 Pack of Washable Wide Markers",
      brand: "N/A",
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
      brand: "N/A",
      color: "Yellow",
      count: 1,
      size: "Wide Ruled",
      type: "Spiral",
      material: "N/A",
      quantity: 0,
      notes: "N/A"
    }
  ];

  let inventoryService: InventoryService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    // Construct an instance of the service with the mock
    // HTTP client.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    inventoryService = TestBed.inject(InventoryService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  describe('When getInventory() is called with no parameters', () => {

    it('calls `api/inventories`', waitForAsync(() => {
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testInventory));
      inventoryService.getInventory().subscribe(() => {
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(inventoryService.inventoryUrl, { params: new HttpParams() });
      });
    }));
  });
})
