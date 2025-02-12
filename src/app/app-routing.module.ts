import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditarProjetoComponent } from './projeto/editar-projeto/editar-projeto.component';
import { EditarTarefaComponent } from './tarefa/editar-tarefa/editar-tarefa.component';
import { KanbanComponent } from './kanban/kanban.component';
import { ListaProjetosComponent } from './projeto/lista-projetos/lista-projetos.component';
import { NovaTarefaComponent } from './tarefa/nova-tarefa/nova-tarefa.component';
import { NovoProjetoComponent } from './projeto/novo-projeto/novo-projeto.component';

const routes: Routes = [
  { path: '', component: ListaProjetosComponent },
  { path: 'projetos/:projeto', component: KanbanComponent },
  { path: 'projetos/novatarefa/:projeto', component: NovaTarefaComponent },
  { path: 'novoProjeto', component: NovoProjetoComponent },
  { path: 'editarProjeto/:projeto', component: EditarProjetoComponent },
  { path: 'editarTarefa/:nomeTarefa', component: EditarTarefaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
