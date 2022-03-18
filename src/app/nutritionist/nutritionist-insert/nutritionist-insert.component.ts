import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from './modal.config'
import { Nutritionist } from '../../models/nutritionist/nutritionist';
import { NutritionistService } from '../../services/nutritionist/nutritionist.service';
import { ThemePalette} from '@angular/material/core';
import { ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { Club } from '../../models/club/club';
import { ClubService } from '../../services/club/club.service';

@Component({
  selector: 'modalNutritionist',    
  templateUrl: './nutritionist-insert.component.html',
  styleUrls: ['./nutritionist-insert.component.scss']
})
export class NutritionistInsertComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  
  //----Config para modal
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<NutritionistInsertComponent>
  private modalRef: NgbModalRef

  //----General
  Nutritionist: Nutritionist = new Nutritionist();  
  NutritionistBackup: Nutritionist = new Nutritionist();
  nutritionistId = null;  
  public modalTitle = '';
  public update = false;
  formSubmitted: boolean;
  
  //----Variables a validar
  clubes: any = [];
  
 
  constructor(
    private modalService: NgbModal,
    private nutritionistService: NutritionistService,
    private clubService: ClubService,

  ) { }

  ngOnInit(): void {
  }

  

  configurarModalInsert(){
    this.modalTitle = "Agregar Nutriologo";
    this.update = false;
    this.Nutritionist = new Nutritionist();  
   

  }

  configurarModalUpdate(object, id){
    this.modalTitle = "Actualizar Nutriologo";
    this.Nutritionist = object;    
    this.update = true;
    this.nutritionistId = id;    
  }

  onSubmit(f) {    
      
    if (f.form.valid) {      
      debugger;  
      this.Nutritionist.create = new Date();
      this.Nutritionist.userCreate = "dev";      
      const nutritionistData = JSON.parse(JSON.stringify(this.Nutritionist));        
      if (this.update == false) {  
        this.nutritionistService.addNutritionist(nutritionistData);  
      } else {  
        this.nutritionistService.updateNutritionist(this.nutritionistId, this.Nutritionist);  
      }  
      this.Nutritionist = new Nutritionist();  
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
        debugger
      });   

      switch (lastView) {
        case "nutritionistInsert":
          this.configurarModalInsert();        
          break;
        case "nutritionistUpdate":                
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
