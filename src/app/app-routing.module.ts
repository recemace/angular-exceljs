import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportarComponent } from './exportar/exportar.component';

const routes: Routes = [
  { path: '', redirectTo: 'exportar', pathMatch: 'full' },
  { path: 'exportar', component: ExportarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
