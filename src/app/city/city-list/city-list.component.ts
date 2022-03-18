import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CityService } from '../../services/city/city.service';
import { City } from '../../models/city/city';
import { AngularFirestore } from '@angular/fire/firestore';  

import { ModalConfig} from "../city-insert/modal.config";


import { faCoffee } from '@fortawesome/free-solid-svg-icons';                
import { CityInsertComponent } from '../city-insert/city-insert.component';


@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  cities: City[];  
  citySelect: any;
  currentCity = null;
  currentIndex = -1;
  title = '';

  isDelete: boolean;  

  faCoffee =faCoffee;      
  @ViewChild('modalCity') private modalCity: CityInsertComponent

  constructor(private cityService: CityService,
    private angularFirestore: AngularFirestore ,
    ) { }

  ngOnInit(): void {
    this.retrieveCities();
  }

  retrieveCities(): void {
    this.cityService.getAll().subscribe((data: any) => {  
      this.cities = data.map(e => {          
        return {       
          id: e.payload.doc.id,
          create: e.payload.doc.data().create,
          userCreate: e.payload.doc.data().createby,
          name: e.payload.doc.data().name, 
          latitude: e.payload.doc.data().latitude, 
          longitude: e.payload.doc.data().longitude,
          nclubes: e.payload.doc.data().nclubes,   
          estatus: e.payload.doc.data().estatus,
        } as City;  
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
    let last = "cityInsert";
    if(object != null)
      last = "cityUpdate";
    return await this.modalCity.open(id, object, last);
  }

}
