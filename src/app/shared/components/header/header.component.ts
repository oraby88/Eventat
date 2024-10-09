import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  tokenExists!: boolean;

  constructor(private _authService:AuthService){}
  ngOnInit(): void {
    this.checkForToken();
  }

  checkForToken() {
    this._authService.token$.subscribe((token) => {
      // Update the tokenExists flag based on the token presence
      this.tokenExists = token != null;
    });
  }

  logout() {
    console.log("loged out");
    localStorage.removeItem('token');
    window.location.reload();
  }

}
