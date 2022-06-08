import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  arrProyectos: Project[]
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    // this.arrProyectos = new Array(
    //   {
    //     nombre: 'Oscar',
    //     descripcion: 'Mi curriculum en Angular',
    //     imagenes: [],
    //     url: 'http://www.10minutosprogramando.com',
    //     ano: 2019,
    //     cliente: 'yo mismo',
    //     urlClient: 'http://www.10minutosprogramando.com',
    //     categoria: 'web',
    //     tecnologias: 'de todo un poco'
    //   }
    // );

    this.baseUrl = 'https://cvbackoibeas.herokuapp.com/api/proyectos';
    this.getToken(); //ejecuta la funcion para recuperar el token
  }

  //Vamos a crear un metodo dentro dwl servicio que me permita obtener el token
  getToken(): void {
    let objetoToken: any;
    //Hacemos la peticion get y esto me devuelve un observable y me tengo que suscribir para recibirlo cuando lo devuelva
    this.httpClient.get('https://cvbackoibeas.herokuapp.com/api/token').subscribe(valor => {
      objetoToken = valor;
      console.log(objetoToken);
      //vamos a guardar el token en el localStorage
      localStorage.setItem('token', objetoToken.token);
    })

  }

  getAllProjects(): Promise<Project[]> {
    // return this.arrProyectos;
    // return this.httpClient.get<Project[]>(this.baseUrl).toPromise()
    //Lo cambio de toPromise a lastValueFrom por estar deprecado
    //necesito las cabeceras
    const httpOptions = {
      headers: new HttpHeaders({
        'access-token': localStorage.getItem('token'), //con esto obtengo el token del localstorage almacenado

      })
    }
    return lastValueFrom(this.httpClient.get<Project[]>(this.baseUrl, httpOptions));
  }


  //Creo una funcion para filtrar proyectos por categoria
  getProjectsByCategory(pCategory: string): Promise<Project[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-token': localStorage.getItem('token'),
      })
    }
    // return this.httpClient.get<Project[]>(this.baseUrl,httpOptions).toPromise();
    return lastValueFrom(this.httpClient.get<Project[]>(this.baseUrl + '/' + pCategory, httpOptions));
  }

}
