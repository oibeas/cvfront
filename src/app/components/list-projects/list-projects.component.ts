import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project'
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit {

  arrProyectos: Project[];
  arrCategorias: string[];

  constructor(private projectServices: ProjectsService) {
    //llamo a la funcion del servicio y me traigo el array de proyectos
    // this.arrProyectos = this.projectServices.getAllProjects();

  }

  ngOnInit(): void {
    // console.log(this.arrProyectos);
    this.obtenerProyectos()
  }

  //Cuando le pido los pryectos me devuelve una promesa, y tengo que meterlo en un array, asi que creo este metodo para poder convertirlo, usando async/await
  async obtenerProyectos() {
    this.arrProyectos = await this.projectServices.getAllProjects()
    // console.log(this.arrProyectos);
    const arrayStrings = this.arrProyectos.map(proyecto => {
      return proyecto.categoria;
    }); //Aqui saco todas las categorias y las meto en un array
    this.arrCategorias = Array.from(new Set(arrayStrings)); //Aqui filtro las categorias repetidas
    console.log(this.arrCategorias);


  }

  //funcion para cargar por categorias los proyectos 
  async cargarCategoria(pCategoria = '') {
    if (pCategoria !== '') {
      this.arrProyectos = await this.projectServices.getProjectsByCategory(pCategoria)
      //Aqui llamamos al metodo del servicio filtrar por categoria
    } else {
      this.arrProyectos = await this.projectServices.getAllProjects(); //sino, me devuelve todos
    }
  }

}
