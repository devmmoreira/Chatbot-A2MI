import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import api from '../../services/tccApiService'

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private history: Router 
  ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      login: [null],
      senha: [null]
    });
  }

  async onSubmit(){
    const data = {
      username: this.formulario.value.login,
      password: this.formulario.value.senha
    }

    if(!data.username || !data.password){
      return alert("Por favor preencha os dados")
    }

    try{
      const userData = await api.post("/users/cfg/authenticate", data)
      localStorage.setItem("userData", JSON.stringify(userData.data))

      this.history.navigate(["/home"])

    } catch(error: any){
      console.log(error.response)
      alert(error.response.data.message)
    }
  }

}
