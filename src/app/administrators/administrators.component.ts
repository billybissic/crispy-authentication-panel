import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService} from "../services/users/users.service";
import {User} from "../interfaces/user";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {FormGroup} from "@angular/forms";
import {AdministratorsService} from "../services/administrators/administrators.service";

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrl: './administrators.component.scss'
})
export class AdministratorsComponent {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  usersDisplayedColumns = ['id', 'username', 'password', 'date_added', 'last_updated', 'uuid',
    'failed_login_attempts', 'is_2fa_configured'];
  adminsDisplayedColumns = ['id', 'username', 'password', 'date_added', 'last_updated', 'uuid',
    'failed_login_attempts', 'is_2fa_configured'];
  usersDataSource = new MatTableDataSource<any>();
  adminsDataSource = new MatTableDataSource<any>();
  usersDataResponse: User[] = [];
  adminsDataResponse: User[] = [];

  @ViewChild(MatSort)
  usersSort!: MatSort;
  adminsSort!: MatSort;
  @ViewChild(MatPaginator)
  usersPaginator!: MatPaginator;
  adminsPaginator!: MatPaginator;
  configForm!: FormGroup;
  filterForm!: FormGroup;

  constructor(private usersService: UsersService,
              private adminsService: AdministratorsService) {}

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((usersData) => {
        console.log(usersData['response_body'])
        this.usersDataResponse = usersData['response_body'];
        console.log(this.usersDataResponse)
        this.usersDataSource.data = usersData['response_body'];
        this.usersDataSource.sort = this.usersSort;
        this.usersDataSource.paginator = this.usersPaginator;
      },
      error => {
        console.log(error);
      },
      () => {
        this.usersDataSource.data = this.usersDataResponse;
        this.usersDataSource.sort = this.usersSort;
        this.usersDataSource.paginator = this.usersPaginator;
        console.log('Data fetched successfully');
        console.log(this.usersDataSource.data)

      });


    this.adminsService.getAllAdministrators().subscribe((adminsData) => {
            console.log(adminsData['response_body'])
            this.adminsDataResponse = adminsData['response_body'];
            console.log(this.adminsDataResponse)
            this.adminsDataSource.data = adminsData['response_body'];
            this.adminsDataSource.sort = this.adminsSort;
            this.adminsDataSource.paginator = this.adminsPaginator;
          },
          error => {
            console.log(error);
          },
          () => {
            this.adminsDataSource.data = this.adminsDataResponse;
            this.adminsDataSource.sort = this.adminsSort;
            this.adminsDataSource.paginator = this.adminsPaginator;
            console.log('Data fetched successfully');
            console.log(this.adminsDataSource.data)
    });
  }

  usersApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();
  }

  adminsApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.adminsDataSource.filter = filterValue.trim().toLowerCase();
  }
}
