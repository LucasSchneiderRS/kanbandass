import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { MatTabsModule}   from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, registerLocaleData } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import localept from '@angular/common/locales/pt';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NovaTarefaComponent } from './tarefa/nova-tarefa/nova-tarefa.component';
import { EventoTarefaComponent } from './tarefa/evento-tarefa/evento-tarefa.component';
import { EditarProjetoComponent } from './projeto/editar-projeto/editar-projeto.component';
import { ListaProjetosComponent } from './projeto/lista-projetos/lista-projetos.component';
import { DeletaProjetoDialogComponent } from './projeto/deleta-projeto-dialog/deleta-projeto-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatDividerModule } from '@angular/material/divider';
import { KanbanComponent } from './kanban/kanban.component';
import { ControleHorasComponent } from './controle-horas/controle-horas.component';
import { EditarTarefaComponent } from './tarefa/editar-tarefa/editar-tarefa.component';
import { NovoProjetoComponent } from './projeto/novo-projeto/novo-projeto.component';
import { MatOptionModule } from '@angular/material/core';
import { EditarTarefaDialogComponent } from './tarefa/editar-tarefa-dialog/editar-tarefa-dialog.component';

registerLocaleData(localept, 'pt');

@NgModule({ 
    declarations: [
      AppComponent,
      NovaTarefaComponent,
      EventoTarefaComponent,
      EditarProjetoComponent,
      ListaProjetosComponent,
      DeletaProjetoDialogComponent,
      NavbarComponent,
      KanbanComponent,
      ControleHorasComponent,
      NavbarComponent,
      EditarTarefaComponent,
      NovoProjetoComponent,
      EditarTarefaDialogComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        DragDropModule,
        AngularFireModule.initializeApp(environment.firebase),
        MatTabsModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatTableModule,
        MatDialogModule,
        NgbModule,
        MatSortModule,
        MatCardModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatOptionModule,
        DatePipe,
        MatTableModule
      ], 
        providers: [
          { provide: LOCALE_ID, useValue: "pt" }
        ] 
      })
export class AppModule { }
