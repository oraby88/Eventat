import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewEventComponent } from './components/new-event/new-event.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewEventComponent, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Eventat';
}
