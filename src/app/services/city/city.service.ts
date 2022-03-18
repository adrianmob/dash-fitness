import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';  
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  
  constructor( private angularFirestore: AngularFirestore, private storage: AngularFireStorage) {     
  }
  
  getAll() {  
    return this.angularFirestore.collection('city').snapshotChanges();  
  }  
  
  addCity(City) {  
    return this.angularFirestore.collection('city').add(City);  
  }  

  deleteCity(cityId) {  
    this.angularFirestore.doc('city/' + cityId).delete();  
  } 

  updateCity(cityId, City) {  
    delete City.id;  
    this.angularFirestore.doc('city/' + cityId).update(City);  
  }  
}
