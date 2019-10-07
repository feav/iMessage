import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.page.html',
  styleUrls: ['./nouveau.page.scss'],
  providers: [DatePipe]
})
export class NouveauPage implements OnInit {
  public messages = new Array();
  public numero : string;
  public nomexp : string;
  public sender : string;
  public messageText : any;
  public nom : string;
  public date : any;
  public items:any;
  constructor(private storage: Storage, private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
  }
   
  Getmessage(){

    
      this.storage.get('messages').then((mes:Array<Message>)=>{
          if (!(this.items) || typeof(this.items) === 'undefined') {
            this.items=new Array();
            this.items=mes;
            console.log(mes);
            //return mes;
          }else{
              this.items=mes;
              //.log(mes);
          }
      })
   return this.items;
  }

  Newmessage(){
        let d =  new Date();
        this.date = this.datePipe.transform(d, 'H:mm')
        let messqge1:Message=new Message
        messqge1.sender=this.sender
        messqge1.message=this.messageText
        messqge1.date=this.date
        messqge1.numero=this.numero
        messqge1.nomexp=this.nomexp


        if (this.nameExist(this.sender)==1) {
            console.log('existent');
        }

        if(this.emptycontrol(this.messageText)){
            this.storage.get('messages').then((mes:Array<Message>)=>{
              this.items=new Array();
              this.items=mes;
              if (this.items &&  typeof(this.items) !=='undefined') {
                  this.messages = this.items;
                  this.messages.push(messqge1);
                  /* put the new content in the old content*/
                  this.storage.set('messages',this.messages); 
                  this.router.navigateByUrl('/home')
              }else{
                /* firt message start here */
                this.messages.push(messqge1);
                this.storage.set('messages',this.messages); 
                this.router.navigateByUrl('/home')
              } 
              console.log(this.messages);
              this.messages=[]

          }) 
        }else{
          console.log('message vide')
        }
        
          
          //this.messages.push(odlms);
  }
  emptycontrol(val:string):boolean{
     if(typeof(val)!=='undefined'){
       if(val.length>0){
         return true
       }else{
         return false
       }
     }else{
       return false
     }
  }
  nameExist(val:string):any{
    if(typeof(val)!=='undefined'){
        
      this.storage.get('messages').then((mes:Array<Message>)=>{
            if (!(mes)) {
            
            }else{
              for (let index = 0; index < mes.length; index++) {
                const message = mes[index];
                if(message.sender==val){
                  //console.log(message.sender+'   '+val)
                  return 1;
                  break;
                }
              }
            }
      })
    }else{
      return false
    }
 }
          

}
class Message{
  'sender':string;
  'message':string;
  'date':string;
  'numero':string;
  'nomexp':string;
}
