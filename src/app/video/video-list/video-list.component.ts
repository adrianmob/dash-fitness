import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { VideoService } from '../../services/video/video.service';
import { Video } from '../../models/video/video';
import { AngularFirestore } from '@angular/fire/firestore';  
import { ModalConfig } from "../video-insert/modal.config";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';                
import { VideoInsertComponent } from '../video-insert/video-insert.component';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videos: Video[];  
  videoSelect: any;
  currentVideo = null;
  currentIndex = -1;
  title = '';

  isDelete: boolean;  

  faCoffee =faCoffee;      
  @ViewChild('modalVideo') private modalVideo: VideoInsertComponent

  constructor(private videoService: VideoService,
    private angularFirestore: AngularFirestore) { }

  ngOnInit(): void {
    this.retrieveVideoes();
  }

  retrieveVideoes(): void {
    this.videoService.getAll().subscribe((data: any) => {  
      this.videos = data.map(e => {          
        return {       
          id: e.payload.doc.id,
          create: e.payload.doc.data().create,
          userCreate: e.payload.doc.data().createby,
          name: e.payload.doc.data().name, 
          description: e.payload.doc.data().description,           
          url: e.payload.doc.data().url,
          category: e.payload.doc.data().category,
          categoryName: e.payload.doc.data().categoryName,
          subcategory: e.payload.doc.data().subcategory,
          club: e.payload.doc.data().club,   
          estatus: e.payload.doc.data().estatus,
        } as Video;  
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
    let last = "videoInsert";
    if(object != null)
      last = "videoUpdate";
    return await this.modalVideo.open(id, object, last);
  }

}
