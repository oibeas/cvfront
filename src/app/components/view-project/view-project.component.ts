import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  proyecto: Project;

  constructor(
    //1º cargamos el activatedroute para recoger el id de la url, y ya inyectamos tambien el servicio
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectsService
  ) { }

  ngOnInit(): void {
    //2ºCuando cargue el componente coger los valores de la url
    //en el activatedRoute, recoge los params y se subscribe para los cambios
    this.activatedRoute.params.subscribe(params => {
      // console.log(params['id']);
      this.obtenerProyectoId(params['id']); //creamos una funcion para recoger el proyecto por ID
    });
  }

  //creamos una funcion para obtener el proyecto por su ID. Llama al servicio, nos devuelve una promesa y recogemos un unico proyecto, necesitamos una variable proyecto e tipo Project
  async obtenerProyectoId(pId) {
    this.proyecto = await this.projectService.getProjectById(pId);
    console.log(this.proyecto);

  }

}
