import { Component, OnInit } from '@angular/core';
import { RutinaService } from '../services/rutinas/rutinas.service';
import { RutinasType } from './rutinas.interface';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css'],
})
export class RutinasComponent implements OnInit {
  socios = [];
  videos = [];
  lunes = [{ value: '' }];
  martes = [{ value: '' }];
  miercoles = [{ value: '' }];
  jueves = [{ value: '' }];
  viernes = [{ value: '' }];
  sabados = [{ value: '' }];
  domingos = [{ value: '' }];
  idSocio;
  rutina = new RutinasType();

  constructor(private _service: RutinaService) {}

  ngOnInit(): void {
    console.log(this.rutina);
    this._service.getAll().then((snapshot) => {
      snapshot.forEach((snap) => {
        let snapshot = snap.data();
        this.socios.push({
          name: `${snapshot.nombreSocio} ${snapshot.apellidoPaternoSocio} ${snapshot.apellidoMaternoSocio}`,
          id: snap.id,
        });
      });
    });
    this._service.getVideos().then((snapshot) => {
      snapshot.forEach((snap) => {
        let snapshot = snap.data();
        this.videos.push({ ...snapshot, id: snap.id });
      });
      console.log(this.videos);
    });
  }

  changeSocio(): void {
    console.log(this.idSocio);
  }

  ver(): void {
    this.lunes.forEach((snap) => {
      let video = this.videos.find((video: any) => video.id === snap.value);
      if (video) this.rutina.lunes.push({ ...video, complete: false });
    });

    this.martes.forEach((snap) => {
      let video = this.videos.find((video: any) => video.id === snap.value);
      if (video) this.rutina.martes.push({ ...video, complete: false });
    });

    this.miercoles.forEach((snap) => {
      let video = this.videos.find((video: any) => video.id === snap.value);
      if (video) this.rutina.miercoles.push({ ...video, complete: false });
    });

    this.jueves.forEach((snap) => {
      let video = this.videos.find((video: any) => video.id === snap.value);
      if (video) this.rutina.jueves.push({ ...video, complete: false });
    });

    console.log(this.viernes);

    this.viernes.forEach((snap) => {
      let video = this.videos.find((video: any) => video.id === snap.value);
      if (video) this.rutina.viernes.push({ ...video, complete: false });
    });

    this.sabados.forEach((snap) => {
      let video = this.videos.find((video: any) => video.id === snap.value);
      if (video) this.rutina.sabados.push({ ...video, complete: false });
    });

    this.domingos.forEach((snap) => {
      let video = this.videos.find((video: any) => video.id === snap.value);
      if (video) this.rutina.domingos.push({ ...video, complete: false });
    });

    this._service.saveRutina(this.idSocio, {
      lunes: this.rutina.lunes,
      martes: this.rutina.martes,
      miercoles: this.rutina.miercoles,
      jueves: this.rutina.jueves,
      viernes: this.rutina.viernes,
      sabados: this.rutina.sabados,
      domingos: this.rutina.domingos,
    });
  }

  eliminar(day, index) {
    day.splice(index, 1);
  }

  agregar(day) {
    day.push({ value: '' });
  }
}
