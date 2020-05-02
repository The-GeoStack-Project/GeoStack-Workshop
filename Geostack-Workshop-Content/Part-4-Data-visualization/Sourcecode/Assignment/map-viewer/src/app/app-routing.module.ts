import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './pages/map.component';


const routes: Routes = [
  { path: '', redirectTo: 'map-viewer', pathMatch: 'full',},
  { path: 'map-viewer', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
