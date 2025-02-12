import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveOffcanvas, NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Tarefa } from '../../modelos/Tarefa';
import * as equipe from 'src/app/modelos/Equipe';
import { environment } from 'src/environments/environment';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0]),
				month: parseInt(date[1]),
				year: parseInt(date[2]),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
	}
}

@Component({
    selector: 'app-editar-tarefa',
    templateUrl: './editar-tarefa.component.html',
    styleUrls: ['./editar-tarefa.component.css'],
    providers: [
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    ],
})
export class EditarTarefaComponent implements OnInit {

  @Input() nomeProjeto: any;
  @Input() indexTarefa: any;
  @Input() statusTarefa: any;

  model: NgbDateStruct = {day: 31, month:10, year:2022}

  nomeTarefa = new UntypedFormControl();
  responsavel = new UntypedFormControl();
  descricao = new UntypedFormControl();
  
  listaEquipe = environment.equipe

  constructor(private router: Router,
              private route: ActivatedRoute,
              private firestore: AngularFireDatabase,
              private calendar: NgbCalendar,
              public activeOffcanvas: NgbActiveOffcanvas) { }

  ngOnInit(): void {
    let tarefa = this.firestore.object<Tarefa>("Projetos/" + this.nomeProjeto + "/tarefas/" + this.statusTarefa + "/" + this.indexTarefa).valueChanges()
    tarefa.subscribe((e : any)=> {
      this.nomeTarefa.setValue(e.nomeTarefa)
      this.descricao.setValue(e.descricao)
      this.responsavel.setValue(e.responsavel)
      var hoje = new Date(e.dataEntrega)
      this.model = {day: hoje.getDate(), month:hoje.getMonth()+1, year:hoje.getFullYear()}
    }
    )
  }

  gravaTarefa(){
    let temp = this.firestore.object<Tarefa>("Projetos/" + this.nomeProjeto + "/tarefas/" + this.statusTarefa + "/" + this.indexTarefa)
    var hoje = new Date(this.model.year,  this.model.month -1, this.model.day)
    temp.update ({
      nomeTarefa : this.nomeTarefa.value,
      responsavel : this.responsavel.value,
      descricao: this.descricao.value,
      dataEntrega: hoje,
      dataCriacao: new Date()

    })
    this.activeOffcanvas.close();
    this.router.navigate(['projetos/' + this.nomeProjeto]);
  }


}
