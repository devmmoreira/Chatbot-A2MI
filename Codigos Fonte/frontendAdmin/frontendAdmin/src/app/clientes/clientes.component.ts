import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';


import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import api from '../../services/tccApiService'

import { UserModel } from 'src/models/UserModel';
import { UserData } from 'src/models/UserData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public users: Array<UserModel> = []
  public userData: UserData = JSON.parse(localStorage.getItem("userData") || "")

  displayedColumns: string[] = ['id', 'fullname', 'username', 'phone', 'email','imagem'];



  dataSource!: MatTableDataSource<UserModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private history: Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  async getUsers(){
    if(this.userData){
      try{
        const response = await api.get("/users", {
          headers: {
            Authorization: this.userData.token
          }
        })

        this.users = await response.data.filter((user: UserModel) => user.id !== "62d00c23-b98a-4b30-8c52-6d78a128faef")

        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      } catch(error: any){
        alert(error.response.data.message)
      }
    } else{
      alert("Invalid Token")
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToUserInfo(id: string){
    sessionStorage.setItem("userId", id)
    this.history.navigate(["/home/user-info"])
  }

}
