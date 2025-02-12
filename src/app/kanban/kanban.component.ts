import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropListGroup, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Projeto } from 'src/app/modelos/Projeto';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarefa } from '../modelos/Tarefa';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditarTarefaDialogComponent } from '../tarefa/editar-tarefa-dialog/editar-tarefa-dialog.component';
import { NovaTarefaComponent } from '../tarefa/nova-tarefa/nova-tarefa.component';
import { environment } from 'src/environments/environment';
import { ControleHorasComponent } from '../controle-horas/controle-horas.component';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { MatDivider } from '@angular/material/divider';


@Component({
    selector: 'app-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements OnInit {
  
  Tarefas : Tarefa[][] = []

  Projeto? : string

  drop(event: CdkDragDrop<Tarefa[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    let temp = this.firestore.object<Tarefa[][]>('Projetos/' + this.Projeto + '/tarefas')
    temp.set (this.Tarefas)
  }

  constructor(private firestore: AngularFireDatabase,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private offcanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
    this.Projeto = <string>this.route.snapshot.paramMap.get('projeto')
    this.Tarefas[0] = []
    this.Tarefas[1] = []
    this.Tarefas[2] = []
    this.Tarefas[3] = []
    this.getTarefas0().subscribe( e => {
        this.Tarefas[0] = (e)
    })
    this.getTarefas1().subscribe( e => {
      this.Tarefas[1] = (e)
    })

    this.getTarefas2().subscribe( e => {
      this.Tarefas[2] = (e)
    })

    this.getTarefas3().subscribe( e => {
      this.Tarefas[3] = (e)
    })
  }

  ngOnDestroy (): void {
  }

  public getTarefas0() : Observable<Tarefa[]> {
    const temp = this.firestore.list<Tarefa> ('Projetos/' + this.Projeto + '/tarefas/0/').valueChanges();
    return temp
  }

  public getTarefas1() : Observable<Tarefa[]> {
    const temp = this.firestore.list<Tarefa> ('Projetos/' + this.Projeto + '/tarefas/1/').valueChanges();
    return temp
  }

  public getTarefas2() : Observable<Tarefa[]> {
    const temp = this.firestore.list<Tarefa> ('Projetos/' + this.Projeto + '/tarefas/2/').valueChanges();
    return temp
  }

  public getTarefas3() : Observable<Tarefa[]> {
    const temp = this.firestore.list<Tarefa> ('Projetos/' + this.Projeto + '/tarefas/3/').valueChanges();
    return temp
  }

  novaTarefa (){
      const offcanvasRef = this.offcanvasService.open(NovaTarefaComponent);
      offcanvasRef.componentInstance.nomeProjeto = this.Projeto;
      offcanvasRef.componentInstance.indexTarefa = this.Tarefas[0].length;
  }

  openDialog(tarefa: Tarefa, status: number, index: number) {
    this.dialog.open(EditarTarefaDialogComponent, {data : {tarefa : tarefa, nomeProjeto: this.Projeto, status: status, index: index}});
  }

  getJpgNomeProjeto () {
    return "https://firebasestorage.googleapis.com/v0/b/" + environment.projeto + ".appspot.com/o/" + this.Projeto + "?alt=media"
  }

  controleHoras(){ 
    const offcanvasRef = this.offcanvasService.open(ControleHorasComponent);
    offcanvasRef.componentInstance.nomeProjeto = this.Projeto;
  }
}


