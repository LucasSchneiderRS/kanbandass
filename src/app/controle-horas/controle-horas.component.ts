import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Horas } from '../modelos/Horas';
import { NgFor, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-controle-horas',
    templateUrl: './controle-horas.component.html',
    styleUrls: ['./controle-horas.component.css'],
})
export class ControleHorasComponent {

  responsavel = new UntypedFormControl();
  horas = new UntypedFormControl();

  @Input() nomeProjeto: any;

  listaEquipe = environment.equipe

  listaHoras : Horas[] = []
  horasTotais : number = 0

  constructor(public activeOffcanvas: NgbActiveOffcanvas,
              private firestore: AngularFireDatabase) {}

  ngOnInit(){
    this.getListaHoras().subscribe( e => {
      this.listaHoras = e
      e.forEach(e => this.horasTotais += +e.horas)
    })
  }

  public getListaHoras() : Observable<Horas[]> {
    return this.firestore.list<Horas>("Projetos/" + this.nomeProjeto + "/horas").valueChanges()
  }

  adicionarHoras () {
      if (this.horas.value == null) {} else {
      let temp = this.firestore.object<Horas>("Projetos/" + this.nomeProjeto + "/horas/" + this.listaHoras.length)
      temp.update ({
        responsavel : this.responsavel.value,
        horas: this.horas.value,
        data: new Date()
      })
      }
      this.activeOffcanvas.close();
   

  }
}
