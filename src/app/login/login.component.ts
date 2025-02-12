import { Component } from '@angular/core';
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
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    app = initializeApp(environment.firebase);

    // Inicializa Authentication.
    auth = getAuth(this.app);
    
    // Define o provedor de autenticação. Usado no processo de login.
    provider = new GoogleAuthProvider();
    
    // Controla a visualização da página.
    view = false;

    ngOnInit() {
        // Monitora status do usuário.
        onAuthStateChanged(this.auth, (user) => {
    
          // Se usuário está logado, faça algo.
          if (user) {
            console.log(user)
          }
          // Se não está logado, faça algo.
          else {
            // O que fazer se usuário não está logado.
          }
        });
      }
      
      // Exemplo de login.
      login() {
        console.log("ok")
        // Seleciona o método de login conforme "environment.signInMethod".
        //if (environment.signInMethod == 'popup')
          signInWithPopup(this.auth, this.provider);
       // else {
       //   signInWithRedirect(this.auth, this.provider);
       // }
      }
      
      // Exemplo de logout.
      logout() {
        this.auth.signOut();
        location.href = '/';
      }
      

}
