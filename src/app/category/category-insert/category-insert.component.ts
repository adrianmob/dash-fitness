import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from './modal.config'
import { Category } from '../../models/category/category';
import { CategoryService } from '../../services/category/category.service';
import { CityService } from '../../services/city/city.service';
import { ThemePalette} from '@angular/material/core';
import { ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { City } from 'src/app/models/city/city';


@Component({
  selector: 'modalCategory',
  templateUrl: './category-insert.component.html',
  styleUrls: ['./category-insert.component.scss']
})
@Injectable()
export class CategoryInsertComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  
  //----Config para modal
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<CategoryInsertComponent>
  private modalRef: NgbModalRef

  //----General
  Category: Category = new Category();  
  CategoryBackup: Category = new Category();
  categoryId = null;  
  public modalTitle = '';
  public update = false;
  formSubmitted: boolean;
  
  //----Variables a validar
  ciudades: any = [];
  //----Variables para multiselect
  // ShowFilter = false;
  // limitSelection = false;
  // subcategories_data = [];
  // selectedItems: any = [];
  // dropdownSettings: any = {};
  // estatus_class = "";

 
  constructor(
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private cityService: CityService,
  ) { }

  ngOnInit(): void {
   
  }

  configurarModalInsert(){
    this.modalTitle = "Agregar Ciudad";
    this.update = false;
    this.Category = new Category();  
    
  }

  configurarModalUpdate(object, id){
    this.modalTitle = "Actualizar Ciudad";
    this.Category = object;    
    this.update = true;
    this.categoryId = id;    
    //----Config del multiselector
    // this.subcategories_data = object.subcategory;
  
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'itemid',
    //   textField: 'itemtext',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: this.ShowFilter
    // };        
  }

  onSubmit(f) {    
      
    if (f.form.valid) {      
      debugger;  
      this.Category.create = new Date();
      this.Category.userCreate = "dev";      
      const categoryData = JSON.parse(JSON.stringify(this.Category));        
      if (this.update == false) {  
        this.categoryService.addCategory(categoryData);  
      } else {  
        this.categoryService.updateCategory(this.categoryId, this.Category);  
      }  
      this.Category = new Category();  
      f.submitted = false;  
      this.formSubmitted = true;        
      this.formSubmitted = false;  
      this.close();       
    }  
  }  

  //#region Config para modal 
  open(id, object, lastView){     
    debugger     
      switch (lastView) {
        case "categoryInsert":
          this.configurarModalInsert();        
          break;
        case "categoryUpdate":                
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

}
