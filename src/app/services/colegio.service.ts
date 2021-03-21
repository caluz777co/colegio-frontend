import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ColegioService  extends GeneralService {

  URL: string = environment.url_base;

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  public listarProfesores():Observable<any> {
    return super.get(this.URL + environment.listarProfesores);
  }

  public listarAsignaturas():Observable<any> {
    return super.get(this.URL + environment.listarAsignaturas);
  }

  public listarEstudiantes(id: number):Observable<any> {
    return super.get(this.URL + environment.listarEstudiantes + id);
  }

}
