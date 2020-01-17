import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { MapComponent } from './map/map.component';
import { NavComponent } from './nav/nav.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AutocompleteTextComponent } from './autocomplete-text/autocomplete-text.component';

const firebaseConfig = {
  apiKey: "AIzaSyBCntd_ZeC1St5WD_AGbJS2I_-5NQKBZpc",
  authDomain: "trailfinder-9807c.firebaseapp.com",
  databaseURL: "https://trailfinder-9807c.firebaseio.com",
  projectId: "trailfinder-9807c",
  storageBucket: "trailfinder-9807c.appspot.com",
  messagingSenderId: "449086566443",
  appId: "1:449086566443:web:b0c455f21f72103a6f7a6e",
  measurementId: "G-5EXLTCVG32"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    AdminComponent,
    MapComponent,
    NavComponent,
    NotfoundComponent,
    AutocompleteTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    GooglePlaceModule
  ],
  exports: [
    AutocompleteTextComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
