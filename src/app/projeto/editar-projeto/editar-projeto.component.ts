import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../modelos/Projeto';
import * as equipe from 'src/app/modelos/Equipe';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import {MatSelectModule} from '@angular/material/select';


@Component({
    selector: 'app-editar-projeto',
    templateUrl: './editar-projeto.component.html',
    styleUrls: ['./editar-projeto.component.css'],
})
export class EditarProjetoComponent implements OnInit {
  Projeto?: string
 
  codigo = new UntypedFormControl();
  nomeProjeto = new UntypedFormControl();
  descricao = new UntypedFormControl();
  objetivo = new UntypedFormControl();
  dataEntrega = new UntypedFormControl(); 
  responsavel = new UntypedFormControl();
  prioridade = new UntypedFormControl();

  listaEquipe = environment.equipe
  
  listaStatus: string[] = ['Ativo', 'Concluido', 'StandBy'];

  equipeSelecionada : string[] | undefined = ['']
  statusSelecionado : string[] = ['']

  constructor(private firestore: AngularFireDatabase,
              private router: Router,
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    
    this.nomeProjeto.disable()
    this.Projeto = <string>this.route.snapshot.paramMap.get('projeto')

    const temp = this.firestore.object<Projeto>('Projetos/' + this.Projeto ).valueChanges()
    temp.subscribe ((e : any) => {
        this.nomeProjeto.setValue(e.nomeProjeto)
         this.descricao.setValue(e.descricao)
         this.objetivo.setValue(e.objetivo)
         this.dataEntrega.setValue(e.dataEntrega)
         this.responsavel.setValue(e.responsavel)
         this.codigo.setValue(e.codigo)
         this.equipeSelecionada = e.equipe
         this.statusSelecionado = [e.status]
         this.prioridade.setValue(e.prioridade) 
    })
  }

  gravaProjeto(){
    let temp = this.firestore.object<Projeto>("Projetos/" + this.nomeProjeto.value)
    temp.update ({
      descricao: this.descricao.value,
      objetivo: this.objetivo.value,
      dataEntrega: moment(this.dataEntrega.value).toDate(),
      responsavel: this.responsavel.value,
      codigo: this.codigo.value,
      status: this.statusSelecionado[0],
      equipe: this.equipeSelecionada,
      prioridade: this.prioridade.value
    })
    this.router.navigate(['']);
  }

  getJpgNomeProjeto() {
    return "https://firebasestorage.googleapis.com/v0/b/" + environment.projeto + ".appspot.com/o/" + this.nomeProjeto.value + "?alt=media"
  }

}
