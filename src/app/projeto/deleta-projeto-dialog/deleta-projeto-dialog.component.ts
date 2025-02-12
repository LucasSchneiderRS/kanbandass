import { Component, Inject, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Projeto } from '../../modelos/Projeto';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-deleta-projeto-dialog',
    templateUrl: './deleta-projeto-dialog.component.html',
    styleUrls: ['./deleta-projeto-dialog.component.css'],
})
export class DeletaProjetoDialogComponent {

  constructor (public dialogRef: MatDialogRef<DeletaProjetoDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public dados: any,
                private firestore: AngularFireDatabase){}

                
  excluirProjeto() {
      const temp = this.firestore.object<Projeto>('Projetos/' + this.dados.nomeProjeto).remove();
      this.dialogRef.close()
  }

  cancelar() {
    this.dialogRef.close()
  }
}
