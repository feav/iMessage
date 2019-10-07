import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {HttpClientModule, HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public items=new Array();
  private API_KEY="758b8cdcb4c0419e9587948194180556"
  constructor(private httpClient: HttpClient,private storage:Storage) { 

  }

  getdata() {
    return this.httpClient.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=941adab4901b41e0aad1bae532f45107');
  }

  all(){
    this.storage.get('messages').then((mes:Array<Message>)=>{
      //this.messages=mes;
      if (!(mes)) {
        this.items=new Array();
      
      }else{
        console.log(this.items);
        if(mes.length>1){
          let compare = new Array()
          for (let index = 0; index < mes.length; index++) {
            const message = mes[index];
            if(compare.indexOf(message.sender)>=0){
              this.items.push(message)
            }
            compare.push(message.sender);
            
          }
        }else{
          
        }
      }
  })
  }
}
class Message{
  'sender':string;
  'message':string;
  'date':string;
  'numero':string;
  'nomexp':string;
}
