import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {WebPanelService} from "../services/web-panel/web-panel.service";
import {Configuration} from "../interfaces/configuration";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.scss'
})
export class ConfigurationsComponent implements OnInit {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'config_name', 'config_value', 'date_added', 'last_updated'];
  dataSource = new MatTableDataSource<any>();
  dataResponse: Configuration[] = [];

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  configForm!: FormGroup;
  filterForm!: FormGroup;

  constructor(private webPanelService: WebPanelService) {}

  ngOnInit() {
    this.webPanelService.geAllConfigurationValues().subscribe((data) => {
        console.log(data['response_body'])
        this.dataResponse = data['response_body'];
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

  onSubmit() {

  }
}
