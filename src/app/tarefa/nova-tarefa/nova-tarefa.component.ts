import { Component, Injectable, Input, OnInit } from '@angular/core';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Tarefa } from '../../modelos/Tarefa';
import * as equipe from 'src/app/modelos/Equipe';
import * as moment from 'moment';
import { NgbActiveOffcanvas, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
	}
}

@Component({
    selector: 'app-nova-tarefa',
    templateUrl: './nova-tarefa.component.html',
    styleUrls: ['./nova-tarefa.component.css'],
    providers: [
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    ],
})
export class NovaTarefaComponent implements OnInit {

  @Input() nomeProjeto: any;
  @Input() indexTarefa: any;

  model: NgbDateStruct = this.calendar.getToday();

  responsavellista? : string
  Projeto? : string
  index? : string
  nomeTarefa = new UntypedFormControl();
  responsavel = new UntypedFormControl();
  responsavel2 = new UntypedFormControl();
  descricao = new UntypedFormControl();
  dataEntrega = new UntypedFormControl(new Date());

  listaEquipe = environment.equipe

  constructor(private router: Router,
              private route: ActivatedRoute,
              private firestore: AngularFireDatabase,
              public activeOffcanvas: NgbActiveOffcanvas,
              private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.Projeto = this.nomeProjeto;
    this.index =  this.indexTarefa;
  }

  gravaTarefa(){
    if (this.nomeTarefa.value == null) {} else {
    let temp = this.firestore.object<Tarefa>("Projetos/" + this.Projeto + "/tarefas/0/" + this.index)
    var hoje = new Date()
    hoje.setDate(this.model.day)
    hoje.setMonth(this.model.month -1)
    hoje.setFullYear(this.model.year)
    temp.update ({
      nomeTarefa : this.nomeTarefa.value,
      responsavel : this.responsavel.value,
      descricao: this.descricao.value,
      dataEntrega: hoje,
      dataCriacao: new Date()
    })
    }
    this.activeOffcanvas.close();
  }
}
