import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RutinaService {
  constructor(private angularFirestore: AngularFirestore) {}

  getAll() {
    return this.angularFirestore.collection('Socios').get().toPromise();
  }

  getVideos() {
    return this.angularFirestore.collection('video').get().toPromise();
  }

  saveRutina(id, payload) {
    return this.angularFirestore.collection(`rutinas`).doc(id).set(payload);
  }
}
