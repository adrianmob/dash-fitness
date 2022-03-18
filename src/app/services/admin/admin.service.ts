import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';  

import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public path = 'avatar/admin/';
  constructor( private angularFirestore: AngularFirestore, private storage: AngularFireStorage) {     
  }

  getAll() {  
    return this.angularFirestore.collection('users_admin').snapshotChanges();  
  }  
  
  addAdmin(Admin) {  
    return this.angularFirestore.collection('users_admin').add(Admin);  
  }  

  updateEstatus(adminId, Admin){
    delete Admin.id;  
    this.angularFirestore.doc('users_admin/' + adminId).update(Admin);  
  }

  deleteAdmin(adminId) {  
    this.angularFirestore.doc('users_admin/' + adminId).delete();  
  } 

  updateAdmin(adminId, Admin) {  
    delete Admin.id;  
    this.angularFirestore.doc('users_admin/' + adminId).update(Admin);  
  }  

  tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(this.path+nombreArchivo, datos);
  }

  referenciaCloudStorage(nombreArchivo: string) {    
    return this.storage.ref(this.path+nombreArchivo);
  }

  deleteImage(url: string){
    const file = this.storage.refFromURL(url);
    file.delete();
  }

  checkValue(field, value){        
    return this.angularFirestore.collection('users_admin').ref.where(field, '==', value);  
  }
    
}
