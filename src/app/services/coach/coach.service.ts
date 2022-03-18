import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';  
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor( private angularFirestore: AngularFirestore, private storage: AngularFireStorage) {     
  }
  
  getAll() {  
    return this.angularFirestore.collection('coach').snapshotChanges();  
  }  
  
  addCoach(Coach) {  
    return this.angularFirestore.collection('coach').add(Coach);  
  }  

  deleteCoach(coachId) {  
    this.angularFirestore.doc('coach/' + coachId).delete();  
  } 

  updateCoach(coachId, Coach) {  
    delete Coach.id;  
    this.angularFirestore.doc('coach/' + coachId).update(Coach);  
  }  
}
