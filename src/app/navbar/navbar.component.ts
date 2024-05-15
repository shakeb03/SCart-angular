import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, startWith, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // user$: Observable<any> | null ; /
  user$: Observable<any> = this.afAuth.authState.pipe(
    startWith(null),
  );
  
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = afAuth.authState; 
    console.log(this.user$);
    
  }

  signIn(){
    this.router.navigate(['/signin']);
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      console.log(this.user$);
      // this.user$ = null;
      console.log("after null");
      console.log(this.user$);
    });
    // this.afAuth.signOut();
  }

}
