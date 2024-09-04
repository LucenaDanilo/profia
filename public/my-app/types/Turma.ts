
import { Student } from "./Student";
import { Teacher } from "./Teacher";
export interface Turma {
    id?: string;
    name?: string;
    trilha?: string;
    semester?: string;
    level?: number;
    datainicio?: string;
    datafim?: string;
    horario?: string;
    teachers?: Teacher[];
    students?: Student[];
    aulas?: any;
    links?: Link[];
}

export interface Link {
    rel?: string;
    href?: string;
}
