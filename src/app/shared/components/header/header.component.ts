import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('navbarNav') navbarNav!: ElementRef;
  tokenExists!: boolean;

  constructor(private _authService:AuthService){}
  ngOnInit(): void {
    this.checkForToken();
  }

  ngAfterViewInit() {
    const navLinks = this.navbarNav.nativeElement.querySelectorAll('.nav-item');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach((link: HTMLElement) => {
      link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const navbarToggler = document.querySelector(
            '.navbar-toggler'
          ) as HTMLElement;
          navbarToggler.click(); // This will trigger the collapse
        }
      });
    });
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
