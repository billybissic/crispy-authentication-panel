import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {AboutComponent} from "./about/about.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {HomeComponent} from "./home-component/home-component.component";
import {ConfigurationsComponent} from "./configurations/configurations.component";
import {MatCardModule} from "@angular/material/card";
import {MatDrawer, MatDrawerContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {AppComponent} from "./app.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {AdministratorsComponent} from "./administrators/administrators.component";
import {UsersComponent} from "./users/users.component";
import {ApiKeysComponent} from "./api-keys/api-keys.component";
import {LogsComponent} from "./logs/logs.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'configurations', component: ConfigurationsComponent},
  { path: 'administrators', component: AdministratorsComponent},
  { path: 'users', component: UsersComponent},
  { path: 'api-keys', component: ApiKeysComponent},
  { path: 'logs', component: LogsComponent},
];

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ConfigurationsComponent,
    UsersComponent
  ],
  imports: [RouterModule.forRoot(routes), HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatDrawer,
    MatDrawerContainer,
    MatButtonModule, AppComponent,
    FontAwesomeModule, ReactiveFormsModule, MatGridList, MatGridTile
  ],
  exports: [RouterModule, FontAwesomeModule]
})

export class AppRoutingModule { }
