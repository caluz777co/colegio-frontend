import { Profesor } from './profesor';
import { Curso } from './curso';

export class Asignatura {
    
    constructor(){};
    id:number;
    nombre:string;
    profesor: Profesor;
    curso: Curso;
}