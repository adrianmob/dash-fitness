import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';  
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor( private angularFirestore: AngularFirestore, private storage: AngularFireStorage) {     
  }
  
  getAll() {  
    return this.angularFirestore.collection('club').snapshotChanges();  
  }  
  
  addClub(Club) {  
    return this.angularFirestore.collection('club').add(Club);  
  }  

  deleteClub(clubId) {  
    this.angularFirestore.doc('club/' + clubId).delete();  
  } 

  updateClub(clubId, Club) {  
    delete Club.id;  
    this.angularFirestore.doc('club/' + clubId).update(Club);  
  }  

}
