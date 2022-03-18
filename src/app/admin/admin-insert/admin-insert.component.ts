import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from './modal.config'
import { Admin } from '../../models/admin/admin';
import { AdminService } from '../../services/admin/admin.service';
import { Fileupload } from '../../models/fileupload/fileupload';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';



@Component({
  selector: 'modalAdmin',
  templateUrl: './admin-insert.component.html',    
  styleUrls: ['./admin-insert.component.scss']
})
@Injectable()
export class AdminInsertComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  

  //----Config para modal
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<AdminInsertComponent>
  private modalRef: NgbModalRef

  //----General
  Admin: Admin = new Admin();  
  AdminBackup: Admin = new Admin();
  adminId = null;  
  public modalTitle = '';
  public update = false;
  formSubmitted: boolean;
  
  //----Variables a validar
  public usernameinvalid = false;
  public emailinvalid = false;
  public rolesinvalid = false;
  public usernameback = "";
  public emailback = "";

  //----Variables para multiselect
  ShowFilter = false;
  limitSelection = false;
  roles_data = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  estatus_class = "";

  //----Variables para image
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public URLPublica = null;
  public porcentaje = 0;
  public finalizado = false;
  public uploadFile = false;
  selectedFiles: FileList;
  currentFileUpload: Fileupload;


  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,

    ) { }
    
  ngOnInit() {

    //----Config del multiselector
    // this.roles_data = [
    //   { itemid: 1, itemtext: 'Admin' },
    //   { itemid: 2, itemtext: 'Coach' },
    //   { itemid: 3, itemtext: 'Nutriologo' }          
    // ];
  
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'itemid',
    //   textField: 'itemtext',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: this.ShowFilter
    // };
    this.setStatus();
  }

  setStatus() {
    (this.selectedItems.length > 0) ? this.rolesinvalid = false : this.rolesinvalid = true;
  }

  //---- Funciones para validar roles seleccionados y si los roles ya estan seleccionados
  // checkValueroles(object){
  //   if(this.Admin.roles.count > 0)
  //     this.rolesinvalid= false;
  //   else
  //     this.rolesinvalid= true;
  // }

  checkValueAlredy(field){
    const objCheck = this.adminService.checkValue(field, this.Admin[field]);
    objCheck.get().then((ref) => {        
      let results = ref.docs.map(doc => doc.data() as any);
      if (results.length > 0) {
        switch (field) {
          case "username":            
            this.usernameinvalid = true;                
            break;
          case "email":
            this.emailinvalid = true;                            
          default:
            break;
        }
      }
      else {
        switch (field) {
          case "username":
            this.usernameinvalid = false;                
            break;
          case "email":
            this.emailinvalid = false;                            
          default:
            break;
          }
      };          
    });      
  }

  configurarModalInsert(){
    this.modalTitle = "Agregar Administrador";
    this.update = false;
    this.Admin = new Admin();  
  }

  configurarModalUpdate(object, id){
    this.modalTitle = "Actualizar Administrador";
    this.Admin = object;    
    this.update = true;
    this.adminId = id;

    this.usernameback = this.Admin.username;
    this.emailback = this.Admin.email;
  }


  //----Funciones para Image
  selectFile(event) {    
    if (event.target.files.length > 0) {
      this.uploadFile = true;
      this.selectedFiles = event.target.files;
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  upload() {        
    const archivo = this.selectedFiles.item(0);
    this.currentFileUpload = new Fileupload(archivo);
    const tarea = this.adminService.tareaCloudStorage( archivo.name, archivo);    
    tarea.percentageChanges().subscribe((porcentaje) => {      
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
        this.uploadFile = false;
        const referencia = this.adminService.referenciaCloudStorage( archivo.name);
        referencia.getDownloadURL().subscribe((URL) => {              
          this.URLPublica = URL;
        });
      }
    });  
  }

  deleteImage(){
    this.adminService.deleteImage(this.Admin.picture);    
  }

  
  onSubmit(f) {    
    // if(this.Admin.roles == undefined || this.Admin.roles.length == 0)
    //   this.rolesinvalid = true;   
    // else
    //   this.rolesinvalid = false;   
      
    if (f.form.valid && this.emailinvalid == false && this.usernameinvalid == false) {  
      this.Admin.picture = this.URLPublica;
      this.Admin.active = true;
      this.Admin.create = new Date();
      this.Admin.userCreate = "dev";    
      this.Admin.estatus = true;
      this.Admin.roles = "admin";
      const adminData = JSON.parse(JSON.stringify(this.Admin));        
      if (this.update == false) {  
        this.adminService.addAdmin(adminData);  
      } else {  
        this.adminService.updateAdmin(this.adminId, this.Admin);  
      }  
      this.Admin = new Admin();  
      f.submitted = false;  
      this.formSubmitted = true;        
      this.formSubmitted = false;  
      this.close();       
    }  
  }  

  //#region Config para modal 
  open(id, object, lastView): Promise<boolean> {      
    this.URLPublica = null;
    this.porcentaje = 0;
    this.finalizado = false;    
    this.uploadFile = null;
    this.usernameinvalid = false;  
    this.emailinvalid = false;  
    switch (lastView) {
      case "adminInsert":
        this.configurarModalInsert();        
        break;
      case "adminUpdate":                
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
