import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CoachService } from '../../services/coach/coach.service';
import { Coach } from '../../models/coach/coach';
import { AngularFirestore } from '@angular/fire/firestore';  

import { ModalConfig} from "../coach-insert/modal.config";


import { faCoffee } from '@fortawesome/free-solid-svg-icons';                
import { CoachInsertComponent } from '../coach-insert/coach-insert.component';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.css']
})
export class CoachListComponent implements OnInit {

  coaches: Coach[];  
  coachSelect: any;
  currentCoach = null;
  currentIndex = -1;
  title = '';

  isDelete: boolean;  

  faCoffee =faCoffee;      
  @ViewChild('modalCoach') private modalCoach: CoachInsertComponent

  constructor(private coachService: CoachService,
    private angularFirestore: AngularFirestore ,
    ) { }

  ngOnInit(): void {
    this.retrieveCoaches();
  }

  retrieveCoaches(): void {
    this.coachService.getAll().subscribe((data: any) => {  
      this.coaches = data.map(e => {          
        return {       
          id: e.payload.doc.id,
          create: e.payload.doc.data().create,
          userCreate: e.payload.doc.data().createby,
          firstname: e.payload.doc.data().firstname, 
          lastname: e.payload.doc.data().lastname, 
          birthday: e.payload.doc.data().birthday,          
          username: e.payload.doc.data().username,
          password: e.payload.doc.data().password,
          email: e.payload.doc.data().email,
          phone: e.payload.doc.data().phone,
          movil: e.payload.doc.data().movil,
          address: e.payload.doc.data().address,
          club: e.payload.doc.data().club,
          estatus: e.payload.doc.data().estatus,
        } as Coach;  
      });    
      debugger
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
    let last = "coachInsert";
    if(object != null)
      last = "coachUpdate";
    return await this.modalCoach.open(id, object, last);
  }

}
