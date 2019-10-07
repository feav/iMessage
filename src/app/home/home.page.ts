import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ApiService} from '../api.service'
//import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public items=[];
  public messageText:any;
  public date:any;
  constructor(private storage: Storage,private router:Router,private apiService :ApiService) {
  
  }

  ionViewDidEnter(){
    this.all(); 
    this.apiService.getdata().subscribe ((data) => {
      console.log (data);
      
    });
  }

  Getmessage(){
    this.storage.get('messages').then((mes:Array<Message>)=>{
    this.items=mes;
    console.log(typeof(this.items))
    if (!(this.items)) {
      this.items=new Array();
    }
   })
  }
  all(){
    this.storage.get('messages').then((mes:Array<Message>)=>{
      //this.messages=mes;
      if (!(mes)) {
        this.items=new Array();
      
      }else{
        this.items=[];
        let compare = new Array()
        for (let index = 0; index < mes.length; index++) {
          const message = mes[index];
          if(compare.indexOf(message.sender)>=0){
            this.items.push(message)
          }
          compare.push(message.sender);
          
        }
      }
  })
  }
  
  particular(name:string){
      let navigationExtras ={queryParams: {name:name}};
      this.router.navigate(['conversation'], navigationExtras);
  }
  
  shortName(shortname:string):string {
      var str = shortname; 
      return  str.substr(0,2).toUpperCase()
  }
}
class Message{
  'sender':string;
  'message':string;
  'date':string;
  'numero':string;
  'nomexp':string;
}
