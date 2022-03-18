import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category/category';
import { AngularFirestore } from '@angular/fire/firestore';  

import { ModalConfig } from "../category-insert/modal.config";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';                
import { CategoryInsertComponent } from '../category-insert/category-insert.component';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[];  
  categorySelect: any;
  currentCategory = null;
  currentIndex = -1;
  title = '';

  isDelete: boolean;  

  faCoffee =faCoffee;      
  @ViewChild('modalCategory') private modalCategory: CategoryInsertComponent

  constructor(private categoryService: CategoryService,
    private angularFirestore: AngularFirestore) { }

  ngOnInit(): void {
    this.retrieveCategoryes();
  }

  retrieveCategoryes(): void {
    this.categoryService.getAll().subscribe((data: any) => {  
      this.categories = data.map(e => {          
        return {       
          id: e.payload.doc.id,
          create: e.payload.doc.data().create,
          userCreate: e.payload.doc.data().createby,
          name: e.payload.doc.data().name,                               
          subcategory: e.payload.doc.data().subcategory,          
          estatus: e.payload.doc.data().estatus,
        } as Category;  
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
    let last = "categoryInsert";
    if(object != null)
      last = "categoryUpdate";
    return await this.modalCategory.open(id, object, last);
  }
}
