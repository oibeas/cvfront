import { Injectable } from '@angular/core';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsServiceService {

  arrProyectos: Project[]

  constructor() {
    this.arrProyectos = new Array(
      {
        nombre: 'Oscar',
        descripcion: 'Mi curriculum en Angular',
        imagenes: [],
        url: 'http://www.10minutosprogramando.com',
        ano: 2019,
        cliente: 'yo mismo',
        urlClient: 'http://www.10minutosprogramando.com',
        categoria: 'web',
        tecnologias: 'de todo un poco'
      }
    );
  }

  getProjects() {
    return this.arrProyectos;
  }


}
