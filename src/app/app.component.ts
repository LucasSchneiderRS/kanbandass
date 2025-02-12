import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import  * as listaEquipe from './modelos/Equipe';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'kanban';

  http = "https://"
  httpend = "-default-rtdb.firebaseio.com"
  endapp = ".firebaseapp.com'"


  ngOnInit(): void {
   //if (window.location.href.includes("localhost")) environment.projeto = "dass-kanban";
   //if (window.location.href.includes("dass-kanban")) environment.projeto = "dass-kanban"; 
   //if (window.location.href.includes("adidas-875421")) environment.projeto = "adidas-875421"                                                  
    

    //environment.firebase.databaseURL = this.http + environment.projeto + this.httpend
    //environment.firebase.authDomain = environment.projeto + this.endapp
    //environment.firebase.storageBucket = environment.projeto + '.appspot.com'

    if (environment.projeto == "dass-kanban")  environment.equipe = listaEquipe.listaNovasTecnologias
    if (environment.projeto == "adidas-875421")  environment.equipe = listaEquipe.listaAdidas
  }
}
