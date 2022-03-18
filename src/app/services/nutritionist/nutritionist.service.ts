import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';  
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class NutritionistService {

  constructor( private angularFirestore: AngularFirestore, private storage: AngularFireStorage) {     
  }
  
  getAll() {  
    return this.angularFirestore.collection('nutritionist').snapshotChanges();  
  }  
  
  addNutritionist(Nutritionist) {  
    return this.angularFirestore.collection('nutritionist').add(Nutritionist);  
  }  

  deleteNutritionist(nutritionistId) {  
    this.angularFirestore.doc('nutritionist/' + nutritionistId).delete();  
  } 

  updateNutritionist(nutritionistId, Nutritionist) {  
    delete Nutritionist.id;  
    this.angularFirestore.doc('nutritionist/' + nutritionistId).update(Nutritionist);  
  } 

 

}
