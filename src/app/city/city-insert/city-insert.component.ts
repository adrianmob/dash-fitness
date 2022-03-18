import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from './modal.config'
import { City } from '../../models/city/city';
import { CityService } from '../../services/city/city.service';
import { ThemePalette} from '@angular/material/core';
import { ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'modalCity',  
  templateUrl: './city-insert.component.html',
  styleUrls: ['./city-insert.component.scss']
})
@Injectable()
export class CityInsertComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  
  //----Config para modal
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<CityInsertComponent>
  private modalRef: NgbModalRef

  //----General
  City: City = new City();  
  CityBackup: City = new City();
  cityId = null;  
  public modalTitle = '';
  public update = false;
  formSubmitted: boolean;
  
  //----Variables a validar
  
 
  constructor(
    private modalService: NgbModal,
    private cityService: CityService,
  ) { }

  ngOnInit(): void {
  }

  configurarModalInsert(){
    this.modalTitle = "Agregar Ciudad";
    this.update = false;
    this.City = new City();  
    this.City.latitude = "";
    this.City.longitude = "";

  }

  configurarModalUpdate(object, id){
    this.modalTitle = "Actualizar Ciudad";
    this.City = object;    
    this.update = true;
    this.cityId = id;    
  }

  onSubmit(f) {    
      
    if (f.form.valid) {      
      debugger;  
      this.City.create = new Date();
      this.City.userCreate = "dev";      
      const cityData = JSON.parse(JSON.stringify(this.City));        
      if (this.update == false) {  
        this.cityService.addCity(cityData);  
      } else {  
        this.cityService.updateCity(this.cityId, this.City);  
      }  
      this.City = new City();  
      f.submitted = false;  
      this.formSubmitted = true;        
      this.formSubmitted = false;  
      this.close();       
    }  
  }  

  //#region Config para modal 
  open(id, object, lastView): Promise<boolean> {     
    debugger

    switch (lastView) {
      case "cityInsert":
        this.configurarModalInsert();        
        break;
      case "cityUpdate":                
        this.configurarModalUpdate(object, id);
        break;    
      default:
        break;
    }
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
