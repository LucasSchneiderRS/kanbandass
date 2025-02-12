import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/modelos/Evento';
import { MatButton } from '@angular/material/button';
import { NgFor, DatePipe } from '@angular/common';

@Component({
    selector: 'app-evento-tarefa',
    templateUrl: './evento-tarefa.component.html',
    styleUrls: ['./evento-tarefa.component.css'],
})
export class EventoTarefaComponent {

  constructor(private firestore: AngularFireDatabase,
              public activeOffcanvas: NgbActiveOffcanvas) {}

  descricao = new UntypedFormControl()

  @Input() nomeProjeto: any;
  @Input() statusTarefa?: number;
  @Input() indexTarefa?: number;

  listaEventos : Evento[] = []

  ngOnInit(){
    this.getListaHoras().subscribe( e => {
      this.listaEventos = e
    })
  }

  public getListaHoras() : Observable<Evento[]> {
    return this.firestore.list<Evento>("Projetos/" + this.nomeProjeto + "/tarefas/" + this.statusTarefa + "/" + this.indexTarefa + "/Eventos").valueChanges()
  }

  gravaEvento() {
    if (this.descricao.value == null) {} else {
      let temp = this.firestore.object<Evento>("Projetos/" + this.nomeProjeto + "/tarefas/" + this.statusTarefa + "/" + this.indexTarefa + "/Eventos/" + this.listaEventos.length)
      temp.update ({
        descricao : this.descricao.value,
        data: new Date()
      })
      }
    this.activeOffcanvas.close();
  }
}
