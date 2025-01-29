import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: CrudComponent }, // Default route for CRUD
];

@NgModule({
  declarations: [CrudComponent], // Declare the CRUD component here
  imports: [RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
})
export class CrudModule {}
