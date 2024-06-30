import { Component } from '@angular/core';
import {ConfigurationsComponent} from "../configurations/configurations.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }

  navigateToAdministrors() {
    this.router.navigate(['/administrators']);
  }
  navigateToConfigurations() {
    this.router.navigate(['/configurations']);
  }

  navigateToAPIKeys() {
    this.router.navigate(['/api-keys']);
  }

  navigateToLogs() {
    this.router.navigate(['/logs']);
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }
}
