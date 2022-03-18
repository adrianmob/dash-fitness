import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ClubService } from '../../services/club/club.service';
import { Club } from '../../models/club/club';
import { AngularFirestore } from '@angular/fire/firestore';  

import { ModalConfig} from "../club-insert/modal.config";


import { faCoffee } from '@fortawesome/free-solid-svg-icons';                
import { ClubInsertComponent } from '../club-insert/club-insert.component';


@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {

  clubes: Club[];  
  clubSelect: any;
  currentClub = null;
  currentIndex = -1;
  title = '';

  isDelete: boolean;  

  faCoffee =faCoffee;      
  @ViewChild('modalClub') private modalClub: ClubInsertComponent

  constructor(private clubService: ClubService,
    private angularFirestore: AngularFirestore ,
    ) { }

  ngOnInit(): void {
    this.retrieveClubes();
  }

  retrieveClubes(): void {
    this.clubService.getAll().subscribe((data: any) => {  
      this.clubes = data.map(e => {          
        return {       
          id: e.payload.doc.id,
          create: e.payload.doc.data().create,
          userCreate: e.payload.doc.data().createby,
          name: e.payload.doc.data().name, 
          latitude: e.payload.doc.data().latitude, 
          longitude: e.payload.doc.data().longitude,
          email: e.payload.doc.data().email,
          phone: e.payload.doc.data().phone,
          address: e.payload.doc.data().address,
          ciudad: e.payload.doc.data().ciudad,
          estatus: e.payload.doc.data().estatus,
        } as Club;  
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
    let last = "clubInsert";
    if(object != null)
      last = "clubUpdate";
    return await this.modalClub.open(id, object, last);
  }

}
