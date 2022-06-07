import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project'
import { ProjectsServiceService } from 'src/app/services/projects-service.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit {

  arrProyectos: Project[];

  constructor(private ProjectServices: ProjectsServiceService) {
    //llamo a la funcion del servicio y me traigo el array de proyectos
    this.arrProyectos = this.ProjectServices.getProjects();
  }

  ngOnInit(): void {
    console.log(this.arrProyectos);

  }

}
