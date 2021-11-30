import { Component, OnInit } from '@angular/core';
import api from '../../services/tccApiService'

import { UserData } from 'src/models/UserData';
import { UserModel } from 'src/models/UserModel';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

interface Products{
  id: string
  name: string
  description: string
  image: string
  price: string
  created_at: Date
  updated_at: Date
  isAsigned: boolean
}

interface UserInfo extends UserModel{
  asignedProducts: Array<Omit<Products, "isAsigned">>
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  
  public userInfo!: UserInfo
  public products: Array<Products> = []
  public userData: UserData = JSON.parse(localStorage.getItem("userData") || "")
  public selectedProducts: Array<string> = []
  
  formulario!: FormGroup;

  constructor(private history: Router) {}

  ngOnInit(): void {
    this.getProducts()
    this.getUserInfo()
    this.toggleSelectProduct
    this.updateInfo
  }

  async getProducts(){
    try{
      const response = await api.get("/products")
      this.products = await response.data.map((product: Products) => ({
        ...product,
        isAsigned: false
      }))

    } catch(error: any){
      alert(error.response.data.message)
    }
  }

  async getUserInfo(){
    if(this.userData){
      try{
        const userInfoResponse = await api.get(`/users/cfg/user-info/${sessionStorage.getItem("userId")}`, {
          headers: {
            Authorization: this.userData.token
          }
        })

        this.userInfo = userInfoResponse.data

        this.products = this.products.map((product: any) => {
            const existPlan = this.userInfo.asignedProducts.filter(asign => asign.id === product.id)
            if(existPlan.length > 0){
              this.selectedProducts.push(product.id)
              return {
                ...product,
                isAsigned: true
              }
            } else{
              return {
                ...product,
                isAsigned: false
              }
            }
        })
      } catch(error: any){
        alert(error.response.data.message)
      }
    } else{
      alert("Invalid Token")
    }
  }

  toggleSelectProduct(id: string){
    const isSelect = this.selectedProducts.filter((product) => product === id)

    if(isSelect.length > 0){
      this.selectedProducts = this.selectedProducts.filter((product) => product !== id)
    } else{
      this.selectedProducts.push(id)
    }
  }

  async updateInfo(form: any){
    try{

      console.log({
        id_user: sessionStorage.getItem("userId"),
        id_product: this.selectedProducts
      })
      
      const response = await api.post(`/products/subscribe`, {
        id_user: sessionStorage.getItem("userId"),
        id_product: this.selectedProducts
      },{
        headers: {
          Authorization: this.userData.token
        }
      })

      alert(response.data.message)
      sessionStorage.clear()
      this.history.navigate(["/home/cliente"])
    } catch(error: any){
      alert(error)
    }
  }
}
