import { Component, OnInit,  Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ColegioService } from '../services/colegio.service';
import { Asignatura } from '../models/asignatura';
import { MatDialog } from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Estudiante } from '../models/estudiante';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  @Input() idProfesor: number; 

  queueRecords = new MatTableDataSource();
  asignaturas: Asignatura[];
  estudiantes: Estudiante[];
  elementosFilasAsignaturas = [];
  
  
  columnasAsignaturas : string[] = ['id', 'Asignatura', 'Grado', 'Salon', 'Ver Listado'];
  etiquetaLista: string = "Lista Estudiantes"
  closeResult: string;
  constructor(
    private colegioService: ColegioService,
    public dialog: MatDialog,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.queueRecords.data = this.elementosFilasAsignaturas;
  }

  ver(idAsignatura, content): void {

    this.colegioService.listarEstudiantes(idAsignatura).subscribe( respuesta => {
      this.estudiantes = respuesta;
    });

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  listarAsignaturas(id:number) {
    this.colegioService.listarAsignaturas().subscribe(data => {
      let jsonFilas:any =[];
      this.asignaturas = data;
      this.asignaturas.forEach( (asignatura) => {
        if(asignatura.profesor.id == id) {
          jsonFilas.push({
            id: asignatura.id,
            asignatura: asignatura.nombre,
            grado: asignatura.curso.grado,
            salon: asignatura.curso.salon,
            isExpanded: false
          });
        }
      });
      this.queueRecords.data = jsonFilas;
    });
  }

  open(content) {
    
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
