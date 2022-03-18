import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from './modal.config'
import { Coach } from '../../models/coach/coach';
import { CoachService } from '../../services/coach/coach.service';
import { ThemePalette} from '@angular/material/core';
import { ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { Club } from '../../models/club/club';
import { ClubService } from '../../services/club/club.service';

@Component({
  selector: 'modalCoach',      
  templateUrl: './coach-insert.component.html',
  styleUrls: ['./coach-insert.component.scss']
})
export class CoachInsertComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  
  //----Config para modal
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<CoachInsertComponent>
  private modalRef: NgbModalRef

  //----General
  Coach: Coach = new Coach();  
  CoachBackup: Coach = new Coach();
  coachId = null;  
  public modalTitle = '';
  public update = false;
  formSubmitted: boolean;
  
  //----Variables a validar
  clubes: any = [];
  
 
  constructor(
    private modalService: NgbModal,
    private coachService: CoachService,
    private clubService: ClubService,

  ) { }

  ngOnInit(): void {
  }

  configurarModalInsert(){
    this.modalTitle = "Agregar Coach";
    this.update = false;
    this.Coach = new Coach();  
   

  }

  configurarModalUpdate(object, id){
    this.modalTitle = "Actualizar Coach";
    this.Coach = object;    
    this.update = true;
    this.coachId = id;    
  }

  onSubmit(f) {    
      
    if (f.form.valid) {      
      debugger;  
      this.Coach.create = new Date();
      this.Coach.userCreate = "dev";      
      const coachData = JSON.parse(JSON.stringify(this.Coach));        
      if (this.update == false) {  
        this.coachService.addCoach(coachData);  
      } else {  
        this.coachService.updateCoach(this.coachId, this.Coach);  
      }  
      this.Coach = new Coach();  
      f.submitted = false;  
      this.formSubmitted = true;        
      this.formSubmitted = false;  
      this.close();       
    }  
  }  


  //#region Config para modal 
  open(id, object, lastView): Promise<boolean> {     
    debugger
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
        } as Club;          
      });   

    switch (lastView) {
      case "coachInsert":
        this.configurarModalInsert();        
        break;
      case "coachUpdate":                
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
