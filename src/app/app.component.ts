import { Component, OnInit, ViewChild} from '@angular/core';
import { ColegioService } from './services/colegio.service';
import { Profesor } from './models/profesor';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  @ViewChild(DashboardComponent) dashboardComp: DashboardComponent
  profesores: Profesor []; 
  seleccionado: any;
  tituloColegio :string = "COLEGIO OLIMPO";
  etiquetaListado :string = "Listado de Estudiantes";
  etiquetaSeleccionar :string = "Seleccione Profesor:";
  
  constructor(
    private colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.listarProfesores();
  }

  listarProfesores() {
    this.colegioService.listarProfesores().subscribe(response => {
      this.profesores = response;
    });
  }

  seleccionarProfesor() {
    this.dashboardComp.listarAsignaturas(this.seleccionado.id);
  }
}
