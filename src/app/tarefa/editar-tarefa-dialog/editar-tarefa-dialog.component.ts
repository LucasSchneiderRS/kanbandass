import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { Tarefa } from '../../modelos/Tarefa';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { EditarTarefaComponent } from '../editar-tarefa/editar-tarefa.component';
import { EventoTarefaComponent } from '../evento-tarefa/evento-tarefa.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-editar-tarefa-dialog',
    templateUrl: './editar-tarefa-dialog.component.html',
    styleUrls: ['./editar-tarefa-dialog.component.css'],
})
export class EditarTarefaDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditarTarefaDialogComponent>,
              private offcanvasService: NgbOffcanvas,
              @Inject(MAT_DIALOG_DATA) public dados: any,
              private firestore: AngularFireDatabase,
              private router: Router
    ) { }

  excluir = "Excluir"

  ngOnInit(): void {
  }

  editarTarefa() {
    this.dialogRef.close()
    const offcanvasRef = this.offcanvasService.open(EditarTarefaComponent);
    offcanvasRef.componentInstance.nomeProjeto = this.dados.nomeProjeto;
    offcanvasRef.componentInstance.indexTarefa = this.dados.index;
    offcanvasRef.componentInstance.statusTarefa = this.dados.status;
    //this.router.navigate(['editarTarefa/' + this.dados.tarefa.nomeTarefa, { projeto: this.dados.nomeProjeto, status: this.dados.status, index: this.dados.index }]);
  }

  excluirTarefa() {
    if (this.excluir == "Sim?") {
      this.firestore.object<Tarefa>('Projetos/' + this.dados.nomeProjeto + "/tarefas/" + this.dados.status + "/" + this.dados.index).remove()
      this.dialogRef.close()
    }
    this.excluir = "Sim?"
  }

  eventosTarefa() {
    this.dialogRef.close()
    const offcanvasRef = this.offcanvasService.open(EventoTarefaComponent);
    offcanvasRef.componentInstance.nomeProjeto = this.dados.nomeProjeto;
    offcanvasRef.componentInstance.indexTarefa = this.dados.index;
    offcanvasRef.componentInstance.statusTarefa = this.dados.status;
  }
}
