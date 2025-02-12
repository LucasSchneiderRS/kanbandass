import { Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { Projeto } from 'src/app/modelos/Projeto';
import { FileUploadService } from '../../services/file-upload.service';
import { NgxImageCompressService } from "ngx-image-compress";
import { environment } from 'src/environments/environment';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-novo-projeto',
    templateUrl: './novo-projeto.component.html',
    styleUrls: ['./novo-projeto.component.css'],
})
export class NovoProjetoComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  codigo = new UntypedFormControl();
  nomeProjeto = new UntypedFormControl();
  descricao = new UntypedFormControl();
  objetivo = new UntypedFormControl();
  dataEntrega = new UntypedFormControl(new Date()); 
  responsavel = new UntypedFormControl();
  prioridade = new UntypedFormControl();
  listaEquipe = environment.equipe

  equipeSelecionada : string[] = ['']

  constructor(private firestore: AngularFireDatabase,
              private router: Router,
              private uploadService: FileUploadService,
              private imageCompress: NgxImageCompressService,
              ) { }

  ngOnInit(): void {

  }

  gravaProjeto(){
    let temp = this.firestore.object<Projeto>("Projetos/" + this.nomeProjeto.value)
    temp.update ({
      nomeProjeto: this.nomeProjeto.value,
      descricao: this.descricao.value,
      objetivo: this.objetivo.value,
      dataEntrega: moment(this.dataEntrega.value).toDate(),
      responsavel: this.responsavel.value,
      dataCriacao: new Date(),
      codigo: this.codigo.value,
      status: "Ativo",
      equipe: this.equipeSelecionada,
      tarefas: [],
      prioridade: this.prioridade.value
    })
    this.uploadImage()
    this.router.navigate(['']);
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.preview = '';
        this.currentFile = file;
  
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          var orientation = -1;

          this.preview = e.target.result;

          this.imageCompress.compressFile(this.preview, orientation, 100, 100, 0, 75).then(
            result => {
              this.preview = result;
            })
        };
  
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  async uploadImage(): Promise<void> {
    const blob = await (await fetch(this.preview)).blob(); 

    const file = new File([blob], 'fileName.jpg', {type:"image/jpeg"});

    this.uploadService.upload(file, this.nomeProjeto.value)
  }

}
