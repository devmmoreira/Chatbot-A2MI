import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private history: Router
  ) { }

  ngOnInit(): void {
    this.redirectRoute
    this.logOut
  }

  redirectRoute(route: string){
    this.history.navigate([route])
  }

  logOut(){
    localStorage.clear()
    this.history.navigate(["/"])
  }
}
