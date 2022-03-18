import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private angularFirestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getAll() {
    return this.angularFirestore.collection('categories').snapshotChanges();
  }

  addCategory(Category) {
    return this.angularFirestore.collection('categories').add(Category);
  }

  deleteCategory(categoryId) {
    this.angularFirestore.doc('category_video/' + categoryId).delete();
  }

  updateCategory(categoryId, Category) {
    delete Category.id;
    this.angularFirestore.doc('category_video/' + categoryId).update(Category);
  }
}
