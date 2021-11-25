import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from 'src/app/restaurant.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
   formValue!: FormGroup;
   //Make a restaurant object
   restaurantModelObj:RestaurantData = new RestaurantData;
   allRestaurantData:any;
   showAdd!: boolean;
   showBtn!:boolean;
  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    //Lifecycle hook use here
    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    })
    this.getAllData();
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd= true;
    this.showBtn = false;
  }
  //Now subscribe our data which is maped via services...
  addResto(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurant Records Added Successfully");
      //clear fill form data
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData(); //when you post any data
    }, err => {
      alert("Something went Wrong!!!!!");
    })
  }
  //Get all data
  getAllData(){
    this.api.getRestaurant().subscribe(res =>{
      this.allRestaurantData = res;
    })
  }
  //Delete records
  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res =>{
      alert("Restaurant records Deleted Successfully");
      this.getAllData();//Quick refresh data
    })
  }
  onEditResto(data:any){
    this.showAdd = false;
    this.showBtn = true;
    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateResto(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.addres;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.UpdateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res =>{
      alert("Restaurant Records updated successfully");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    })

  }

}


