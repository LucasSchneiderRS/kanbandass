import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatTabChangeEvent, MatTabGroup, MatTab } from '@angular/material/tabs';
import { initializeApp } from 'firebase/app';
import { 
	getAuth,            // Sempre → Inicializa auth
	onAuthStateChanged, // Sempre → Monitora status da auth
	GoogleAuthProvider, // Login → Login com Google
	signInWithPopup,    // Login → Login com popup
	signInWithRedirect, // Login → Login com redirecionamento
	getRedirectResult,  // Login → Status do redirecionamento
	User		    // Profile → Model do usuário
} from 'firebase/auth';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userText : any = "Fazer Login"
  //@HostListener('document:click', ['$event.target']) 
  //onPageClick(targetElement: any){
  ////  switch (targetElement.innerText) {
  //    case "Projetos": this.router.navigate(['']); break;
  //    case "Novo Projeto": this.router.navigate(['/novoProjeto']); break;
  //  }
  //}

  goListaProjetos(){
    this.router.navigate(['']);
  }

  goNovoProjeto(){
    this.router.navigate(['/novoProjeto'])
  }

  constructor(private router: Router) { }
  index = 0
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);
  provider = new GoogleAuthProvider();
  view = false;
  fezlogin = false

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        let domain : any = ""
        domain = user.email?.split("@")
        if(domain[1] == "grupodass.com.br"){
          if(user.displayName) environment.user = user.displayName
          console.log(user)
          this.userText = user.displayName
          this.fezlogin = true
        }
      } else {
        this.userText = "Fazer Login"
        environment.user = ""
        this.fezlogin = false
      }
    });
  }

  login() {
    if(environment.user == ""){
      signInWithPopup(this.auth, this.provider);
    } else {
      this.auth.signOut();
      environment.user = ""
    }
  }

}
