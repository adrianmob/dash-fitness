import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInsertComponent } from './admin/admin-insert/admin-insert.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { CityListComponent } from './city/city-list/city-list.component';
import { ClubListComponent } from './club/club-list/club-list.component';
import { NutritionistListComponent } from './nutritionist/nutritionist-list/nutritionist-list.component';
import { CoachListComponent } from './coach/coach-list/coach-list.component';
import { VideoListComponent } from './video/video-list/video-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { RutinasComponent } from './rutinas/rutinas.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin-list', pathMatch: 'full' },
  { path: 'admin-list', component: AdminListComponent },
  { path: 'admin-insert', component: AdminInsertComponent },
  { path: 'city-list', component: CityListComponent },
  { path: 'club-list', component: ClubListComponent },
  { path: 'nutri-list', component: NutritionistListComponent },
  { path: 'coach-list', component: CoachListComponent },
  { path: 'video-list', component: VideoListComponent },
  { path: 'rutinas', component: RutinasComponent },
  { path: 'category-list', component: CategoryListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
