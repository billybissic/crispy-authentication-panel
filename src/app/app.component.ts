import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatToolbar} from "@angular/material/toolbar";
import {faUser, faBars} from "@fortawesome/free-solid-svg-icons";
import {MatButton} from "@angular/material/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    MatDrawer,
    MatDrawerContainer,
    NavBarComponent,
    FaIconComponent,
    MatToolbar,
    MatButton
  ]
})
export class AppComponent {
  constructor(private router: Router) {
  }

  faUser = faUser;
  faBars = faBars;
  title = 'Crispy Authentication System';
  //showFiller = false;
  showLogin = false;
  isAdministrator = true;
  panelTitle: string = 'Crispy Authentication System';
  pageTitle: string = '';

  navigateToHome() {
    this.router.navigate(['']);
    this.pageTitle = '';
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
    this.pageTitle = 'Manage Users';
  }

  navigateToAdministrors() {
    this.router.navigate(['/administrators']);
    this.pageTitle = 'Manage Administrators';
  }
  navigateToConfigurations() {
    this.router.navigate(['/configurations']);
    this.pageTitle = 'Manage Configurations';
  }

  navigateToAPIKeys() {
    this.router.navigate(['/api-keys']);
    this.pageTitle = 'Manage API Keys';
  }

  navigateToLogs() {
    this.router.navigate(['/logs']);
    this.pageTitle = 'View Logs';
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
    this.pageTitle = 'About';
  }

}
