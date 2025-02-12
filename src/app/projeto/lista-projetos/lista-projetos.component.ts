import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeletaProjetoDialogComponent } from '../deleta-projeto-dialog/deleta-projeto-dialog.component';
import { Projeto } from '../../modelos/Projeto';
import { MatSort, Sort, MatSortHeader } from '@angular/material/sort';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-lista-projetos',
    templateUrl: './lista-projetos.component.html',
    styleUrls: ['./lista-projetos.component.css'],
})
export class ListaProjetosComponent implements OnInit {

  projetosList : any 

  dataSource = new MatTableDataSource();
  router= inject(Router)
  route = inject(ActivatedRoute)
  firestore = inject(AngularFireDatabase)
  status = new UntypedFormControl()
  prioridade1 = new UntypedFormControl()

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
              public dialog: MatDialog,
              ){ }

  ngOnInit(): void {
    this.status.setValue("")
    this.prioridade1.setValue("")
    this.getProjetos()
    this.getProjetos().subscribe( e => {
      this.dataSource.data = e;
      this.dataSource.sort = this.sort;
    })

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  selectChange (){
    this.getProjetos().subscribe( e => {
      this.projetosList = e
      if (this.status.value == "") {} else {this.projetosList = this.projetosList.filter((projeto: any) => projeto.status == this.status.value)}
      if (this.prioridade1.value == "") {} else { this.projetosList = this.projetosList.filter((projeto: any) => projeto.prioridade == this.prioridade1.value)}
      this.dataSource.data = this.projetosList
      this.dataSource.sort = this.sort;
    }
    ) 
  }
  

  public getProjetos() {//   Observable<any> {
    const temp = this.firestore.list<any>('Projetos').valueChanges();
    return temp
  }
  

  selecionaProjeto(nomeProjeto : string ) {
    this.router.navigate(['projetos/' + nomeProjeto]);
  }

  editarProjeto(nomeProjeto : string ) {
    this.router.navigate(['editarProjeto/' + nomeProjeto]);
  }

  openDialogDeletaProjeto(projeto: string) {
    this.dialog.open(DeletaProjetoDialogComponent, {data : {nomeProjeto: projeto}});
  }

  excluirProjeto(nomeProjeto : string ) {
    const temp = this.firestore.object<Projeto>('Projetos/' + nomeProjeto).remove();
  }

  getJpgNomeProjeto (nomeProjeto : string) {
    return "https://firebasestorage.googleapis.com/v0/b/" + environment.projeto + ".appspot.com/o/" + nomeProjeto + "?alt=media"
  }

}
