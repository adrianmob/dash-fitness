import {
  Component,
  Injectable,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from './modal.config';
import { Video } from '../../models/video/video';
import { VideoService } from '../../services/video/video.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Club } from '../../models/club/club';
import { ClubService } from '../../services/club/club.service';
import { CategoryService } from '../../services/category/category.service';
import { Category } from 'src/app/models/category/category';

@Component({
  selector: 'modalVideo',
  templateUrl: './video-insert.component.html',
  styleUrls: ['./video-insert.component.scss'],
})
export class VideoInsertComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  //----Config para modal
  @Input() public modalConfig: ModalConfig;
  @ViewChild('modal') private modalContent: TemplateRef<VideoInsertComponent>;
  private modalRef: NgbModalRef;

  //----General
  Video: Video = new Video();
  VideoBackup: Video = new Video();
  videoId = null;
  public modalTitle = '';
  public update = false;
  formSubmitted: boolean;

  //----Variables a validar
  clubes: any = [];
  categories: any = [];
  subcategories: any = [];

  constructor(
    private modalService: NgbModal,
    private videoService: VideoService,
    private clubService: ClubService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {}

  configurarModalInsert() {
    this.modalTitle = 'Agregar Video';
    this.update = false;
    this.Video = new Video();
  }

  configurarModalUpdate(object, id) {
    this.modalTitle = 'Actualizar Video';
    this.Video = object;
    this.update = true;
    this.videoId = id;
  }

  onSubmit(f) {
    if (f.form.valid) {
      debugger;
      this.Video.create = new Date();
      this.Video.userCreate = 'dev';
      const videoData = JSON.parse(JSON.stringify(this.Video));
      videoData.url = videoData.url.replace('watch?v=', 'embed/');
      if (this.update == false) {
        this.videoService.addVideo(videoData);
      } else {
        this.videoService.updateVideo(this.videoId, this.Video);
      }
      this.Video = new Video();
      f.submitted = false;
      this.formSubmitted = true;
      this.formSubmitted = false;
      this.close();
    }
  }

  //#region Config para modal
  open(id, object, lastView): Promise<boolean> {
    debugger;
    this.clubService.getAll().subscribe((data: any) => {
      this.clubes = data.map((e) => {
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

      this.categoryService.getAll().subscribe((data: any) => {
        debugger;
        this.categories = data.map((e) => {
          return {
            id: e.payload.doc.id,
            create: e.payload.doc.data().create,
            userCreate: e.payload.doc.data().createby,
            name: e.payload.doc.data().name,
            subcategory: e.payload.doc.data().subcategory,
          } as Category;
        });

        switch (lastView) {
          case 'videoInsert':
            this.configurarModalInsert();
            break;
          case 'videoUpdate':
            this.configurarModalUpdate(object, id);
            break;
          default:
            break;
        }
      });
    });

    return new Promise<boolean>((resolve) => {
      this.modalRef = this.modalService.open(this.modalContent, {
        size: 'xl',
        backdrop: 'static',
        keyboard: false,
      });
      this.modalRef.result.then(resolve, resolve);
    });
  }

  async close(): Promise<void> {
    if (
      this.modalConfig.shouldClose === undefined ||
      (await this.modalConfig.shouldClose())
    ) {
      const result =
        this.modalConfig.onClose === undefined ||
        (await this.modalConfig.onClose());
      this.modalRef.close(result);
    }
  }

  async dismiss(): Promise<void> {
    if (
      this.modalConfig.shouldDismiss === undefined ||
      (await this.modalConfig.shouldDismiss())
    ) {
      const result =
        this.modalConfig.onDismiss === undefined ||
        (await this.modalConfig.onDismiss());
      this.modalRef.dismiss(result);
    }
  }
}
