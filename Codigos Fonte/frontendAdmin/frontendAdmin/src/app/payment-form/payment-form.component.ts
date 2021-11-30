import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/models/UserData';

import api from '../../services/tccApiService'

interface DataRequest{
  user_id: string
  title: string
  value: number
  type: string,
  dueDate: Date
}

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  formulario!: FormGroup;
  public userData: UserData = JSON.parse(localStorage.getItem("userData") || "")

  constructor(
    private formBuilder: FormBuilder,
    private history: Router 
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      title: [""],
      value: [null],
      type: [""],
      dueDate: [""]
    });
    this.createPayment
    this.cancelAdd
  }

  async createPayment(){
    const data: DataRequest = {
      user_id: sessionStorage.getItem("userId") || "",
      title: this.formulario.value.title,
      value: this.formulario.value.value,
      type: this.formulario.value.type,
      dueDate: this.formulario.value.dueDate
    }

    let isValid = true
    let info: keyof DataRequest

    for(info in data){
      if(data[info] === "" || data[info] === null){
        isValid = false
      }
    }

    if(!isValid){
      return alert("Preencha todas as informações")
    }

    try{ 
      await api.post("/payment/add", data, {
        headers:{
          Authorization: this.userData.token
        }
      })

      alert("Pagamento adicionado")
      this.history.navigate(["/home/pagamento"])
    } catch(error: any){
      alert(error.response.data.message)
    }
  }


  cancelAdd(){
    sessionStorage.clear()
    this.history.navigate(["/home/pagamento"])
  }
}
