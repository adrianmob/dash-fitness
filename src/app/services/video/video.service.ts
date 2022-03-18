import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';  
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor( private angularFirestore: AngularFirestore, private storage: AngularFireStorage) {     
  }

  getAll() {  
    return this.angularFirestore.collection('video').snapshotChanges();  
  }  
  
  addVideo(Video) {  
    return this.angularFirestore.collection('video').add(Video);  
  }  

  deleteVideo(videoId) {  
    this.angularFirestore.doc('video/' + videoId).delete();  
  } 

  updateVideo(videoId, Video) {  
    delete Video.id;  
    this.angularFirestore.doc('video/' + videoId).update(Video);  
  }  
}
