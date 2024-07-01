import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService} from "../services/users/users.service";
import {User} from "../interfaces/user";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'username', 'password', 'date_added', 'last_updated', 'uuid',
    'failed_login_attempts', 'is_2fa_configured'];
  dataSource = new MatTableDataSource<any>();
  dataResponse: User[] = [];

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  configForm!: FormGroup;
  filterForm!: FormGroup;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data) => {
        console.log(data['response_body'])
        this.dataResponse = data['response_body'];
        console.log(this.dataResponse)
        this.dataSource.data = data['response_body'];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error);
      },
      () => {
        this.dataSource.data = this.dataResponse;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('Data fetched successfully');
        console.log(this.dataSource.data)
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
