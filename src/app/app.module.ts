import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { AdminInsertComponent } from './admin/admin-insert/admin-insert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { RealTimeDatabaseComponent } from './real-time-database/real-time-database.component';
// import { CloudFirestoreComponent } from './cloud-firestore/cloud-firestore.component';

import { ModalModule } from 'ngb-modal';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faCircle, faSquare } from '@fortawesome/free-solid-svg-icons';
import {
  faCircle as farCircle,
  faSquare as farSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faStackOverflow,
  faGithub,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CityListComponent } from './city/city-list/city-list.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityInsertComponent } from './city/city-insert/city-insert.component';
import { ClubListComponent } from './club/club-list/club-list.component';
import { ClubInsertComponent } from './club/club-insert/club-insert.component';
import { ClubDetailComponent } from './club/club-detail/club-detail.component';
import { NutritionistListComponent } from './nutritionist/nutritionist-list/nutritionist-list.component';
import { NutritionistInsertComponent } from './nutritionist/nutritionist-insert/nutritionist-insert.component';
import { NutritionistDetailComponent } from './nutritionist/nutritionist-detail/nutritionist-detail.component';
import { CoachListComponent } from './coach/coach-list/coach-list.component';
import { CoachInsertComponent } from './coach/coach-insert/coach-insert.component';
import { CoachDetailComponent } from './coach/coach-detail/coach-detail.component';

import { VideoListComponent } from './video/video-list/video-list.component';
import { VideoInsertComponent } from './video/video-insert/video-insert.component';
import { VideoDetailComponent } from './video/video-detail/video-detail.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryInsertComponent } from './category/category-insert/category-insert.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { RutinasComponent } from './rutinas/rutinas.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminListComponent,
    AdminDetailComponent,
    AdminInsertComponent,
    CityListComponent,
    CityDetailComponent,
    CityInsertComponent,
    ClubListComponent,
    ClubInsertComponent,
    ClubDetailComponent,
    NutritionistListComponent,
    NutritionistInsertComponent,
    NutritionistDetailComponent,
    CoachListComponent,
    CoachInsertComponent,
    CoachDetailComponent,
    VideoListComponent,
    VideoInsertComponent,
    VideoDetailComponent,
    CategoryListComponent,
    CategoryInsertComponent,
    CategoryDetailComponent,
    RutinasComponent,
    // RealTimeDatabaseComponent,
    // CloudFirestoreComponent
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,

    // ModalModule
    // AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AdminInsertComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(
      faCircle,
      faSquare,
      farCircle,
      farSquare,
      faStackOverflow,
      faGithub,
      faMedium
    );
  }
}
