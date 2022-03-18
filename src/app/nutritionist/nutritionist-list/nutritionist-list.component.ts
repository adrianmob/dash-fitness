import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NutritionistService } from '../../services/nutritionist/nutritionist.service';
import { Nutritionist } from '../../models/nutritionist/nutritionist';
import { AngularFirestore } from '@angular/fire/firestore';  

import { ModalConfig} from "../nutritionist-insert/modal.config";


import { faCoffee } from '@fortawesome/free-solid-svg-icons';                
import { NutritionistInsertComponent } from '../nutritionist-insert/nutritionist-insert.component';


@Component({
  selector: 'app-nutritionist-list',
  templateUrl: './nutritionist-list.component.html',
  styleUrls: ['./nutritionist-list.component.css']
})
export class NutritionistListComponent implements OnInit {

  nutritionistes: Nutritionist[];  
  nutritionistSelect: any;
  currentNutritionist = null;
  currentIndex = -1;
  title = '';

  isDelete: boolean;  

  faCoffee =faCoffee;      
  @ViewChild('modalNutritionist') private modalNutritionist: NutritionistInsertComponent

  constructor(private nutritionistService: NutritionistService,
    private angularFirestore: AngularFirestore ,
    ) { }

  ngOnInit(): void {
    this.retrieveNutritionistes();
  }

  retrieveNutritionistes(): void {
    this.nutritionistService.getAll().subscribe((data: any) => {  
      this.nutritionistes = data.map(e => {          
        return {       
          id: e.payload.doc.id,
          create: e.payload.doc.data().create,
          userCreate: e.payload.doc.data().createby,
          firstname: e.payload.doc.data().firstname, 
          lastname: e.payload.doc.data().lastname, 
          birthday: e.payload.doc.data().birthday,
          professionallicense: e.payload.doc.data().professionallicense,
          username: e.payload.doc.data().username,
          password: e.payload.doc.data().password,
          email: e.payload.doc.data().email,
          phone: e.payload.doc.data().phone,
          movil: e.payload.doc.data().movil,
          address: e.payload.doc.data().address,
          estatus: e.payload.doc.data().estatus,
        } as Nutritionist;  
      });    
    });  
  }

  public modalConfig: ModalConfig = {
    modalTitle: "Title",    
    onDismiss: () => {
      return true
    },
    dismissButtonLabel: "Dismiss",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close"
  }  

  async openModal(id, object) { 
    debugger   
    let last = "nutritionistInsert";
    if(object != null)
      last = "nutritionistUpdate";
    return await this.modalNutritionist.open(id, object, last);
  }

}
