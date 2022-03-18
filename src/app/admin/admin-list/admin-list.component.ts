import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { Admin } from '../../models/admin/admin';
import { AngularFirestore } from '@angular/fire/firestore';  

import { AdminInsertComponent} from "../admin-insert/admin-insert.component";
import { ModalConfig} from "../admin-insert/modal.config";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';                


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
 
  admins: Admin[];  
  adminSelect: any;
  currentAdmin = null;
  currentIndex = -1;
  title = '';

  isDelete: boolean; 
  isUpdate: boolean; 

  
  faCoffee =faCoffee;      
  @ViewChild('modalAdmin') private modalAdmin: AdminInsertComponent

  constructor(private adminService: AdminService,
    private angularFirestore: AngularFirestore ,
    ) { }
 
  ngOnInit(): void {
    this.retrieveAdmins();
  }


  retrieveAdmins(): void {
    this.adminService.getAll().subscribe((data: any) => {  
      this.admins = data.map(e => {          
        return {       
          id: e.payload.doc.id,
          create: e.payload.doc.data().create,
          userCreate: e.payload.doc.data().userCreate,
          first: e.payload.doc.data().first, 
          last: e.payload.doc.data().last,
          email: e.payload.doc.data().email,
          username: e.payload.doc.data().username,
          password: e.payload.doc.data().password,
          picture: e.payload.doc.data().picture,
          active: e.payload.doc.data().active,
          roles: e.payload.doc.data().roles,
          estatus: e.payload.doc.data().estatus,
        } as Admin;  
      });    
    });  
  }

  estatusChange(id, admin) {  
    if (confirm('Desea cambiar el estatus del registro?')) {    
      debugger;
      admin.estatus = false;
      this.adminService.updateEstatus(id, admin);  
      this.isUpdate = true;  
      setInterval(() => {  
        this.isUpdate = false;  
      }, 2000);  
    }  
  } 

  delete(id) {  
    if (confirm('Desea borrar el registro?')) {    
      this.adminService.deleteAdmin(id);  
      this.isDelete = true;  
      setInterval(() => {  
        this.isDelete = false;  
      }, 2000);  
    }  
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
    let last = "adminInsert";
    if(object != null)
      last = "adminUpdate";
    return await this.modalAdmin.open(id, object, last);
  }

}
