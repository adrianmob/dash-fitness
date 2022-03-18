import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from './modal.config'
import { Club } from '../../models/club/club';
import { ClubService } from '../../services/club/club.service';
import { CityService } from '../../services/city/city.service';
import { ThemePalette} from '@angular/material/core';
import { ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { City } from 'src/app/models/city/city';

@Component({
  selector: 'modalClub',    
  templateUrl: './club-insert.component.html',
  styleUrls: ['./club-insert.component.scss']
})
@Injectable()
export class ClubInsertComponent implements OnInit {

  
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  
  //----Config para modal
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<ClubInsertComponent>
  private modalRef: NgbModalRef

  //----General
  Club: Club = new Club();  
  ClubBackup: Club = new Club();
  clubId = null;  
  public modalTitle = '';
  public update = false;
  formSubmitted: boolean;
  
  //----Variables a validar
  ciudades: any = [];

 
  constructor(
    private modalService: NgbModal,
    private clubService: ClubService,
    private cityService: CityService,
  ) { }

  ngOnInit(): void {
  }


  configurarModalInsert(){
    this.modalTitle = "Agregar Ciudad";
    this.update = false;
    this.Club = new Club();  
    this.Club.latitude = "";
    this.Club.longitude = "";

  }

  configurarModalUpdate(object, id){
    this.modalTitle = "Actualizar Ciudad";
    this.Club = object;    
    this.update = true;
    this.clubId = id;    
  }

  onSubmit(f) {    
      
    if (f.form.valid) {      
      debugger;  
      this.Club.create = new Date();
      this.Club.userCreate = "dev";      
      const clubData = JSON.parse(JSON.stringify(this.Club));        
      if (this.update == false) {  
        this.clubService.addClub(clubData);  
      } else {  
        this.clubService.updateClub(this.clubId, this.Club);  
      }  
      this.Club = new Club();  
      f.submitted = false;  
      this.formSubmitted = true;        
      this.formSubmitted = false;  
      this.close();       
    }  
  }  

  //#region Config para modal 
  open(id, object, lastView): Promise<boolean> {     
    debugger
    this.cityService.getAll().subscribe((data: any) => {  
      this.ciudades = data.map(e => {          
        return {       
          id: e.payload.doc.id,
          create: e.payload.doc.data().create,
          userCreate: e.payload.doc.data().createby,
          name: e.payload.doc.data().name, 
          latitude: e.payload.doc.data().latitude, 
          longitude: e.payload.doc.data().longitude,
          nclubes: e.payload.doc.data().nclubes       
        } as City;  
        
      });    
      switch (lastView) {
        case "clubInsert":
          this.configurarModalInsert();        
          break;
        case "clubUpdate":                
          this.configurarModalUpdate(object, id);
          break;    
        default:
          break;
      }
    });  

    
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'xl', backdrop: 'static', keyboard: false })
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {        
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {    
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }

  //#endregion

}
