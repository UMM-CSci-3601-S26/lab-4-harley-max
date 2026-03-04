// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Inventory Imports
import { InventoryComponent } from './inventory/inventory.component';
import { SupplyListComponent } from './supplylist/supplylist.component';

// Note: Any routes for adding new items need to come before the routes for getting an item by an individual ID
// Ie: 'user/new' comes before 'users/:id'
const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'inventory', component: InventoryComponent, title: 'Inventory'},
  {path: 'supplylist', component: SupplyListComponent, title: 'Supply List'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
