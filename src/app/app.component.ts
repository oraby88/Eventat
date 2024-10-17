import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewEventComponent } from './components/new-event/new-event.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AuthService } from './shared/services/auth/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { ScannerIneModule } from 'ngx-scanner';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewEventComponent, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Eventat';
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

}
