import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
//import { NavController, NavParams } from '@ionic/angular';
//import { NavParams } from 'ionic-angular';



@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
  providers: [DatePipe]
})
export class ConversationPage implements OnInit {
  public messages=new Array();
  public older=new Array();
  public numero : string;
  public nomexp : string;
  public sender : string;
  public messageText : any;
  public nom : string;
  public date : any;
  public data:any;
  public items:any;
  public itemold:any;

  constructor(private storage: Storage, private datePipe: DatePipe,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //if(this.messages.length>0){
      this.Getmessage();
      this.route.queryParams.subscribe(params => {
           if (params && params.name) {
             this.data = params;
             //console.log(this.data)
           }
       });
   // }
     

  }
  Send(){
    //if(this.messageText.length>5){
      /*   var d =  new Date();
        this.date = this.datePipe.transform(d, 'H:mm')
        console.log(this.date);
        if (!(this.messages)) {
          this.messages=new Array();
        }
        let messqge1:Message=new Message
        messqge1.sender=this.data.name
        messqge1.message=this.messageText
        messqge1.date=this.date
        this.messages.push(messqge1)
        this.messageText=''

        this.storage.set('messages',this.messages) 
        console.log(this.messageText); */


        var d =  new Date();
        this.date = this.datePipe.transform(d, 'H:mm')

          let messqge1:Message=new Message
          messqge1.sender=this.data.name
          messqge1.message=this.messageText
          messqge1.date=this.date
          messqge1.numero='23232323'
          messqge1.nomexp=this.data.name;
          
          this.storage.get('messages').then((mes:Array<Message>)=>{
            //let all=new Array();
            this.itemold=mes;
            if (this.itemold &&  typeof(this.itemold) !=='undefined') {
                this.older = this.itemold;
                //this.messages.push(messqge1);
                //this.storage.set('messages',this.messages); 
            } 
           
        })


          
          this.storage.get('messages').then((mes:Array<Message>)=>{
            //this.messages=mes;
            if (!(mes)) {
              this.messages=new Array();
            }else{
              for (let index = 0; index < mes.length; index++) {
                const message = mes[index];
                if (message.sender==this.data.name) {
                   this.items=message
                }
                
              }
              //this.items.push(messqge1);
              this.messages.push(messqge1)
              //this.storage.set('messages',this.messages) 
              //console.log(this.messages)
              this.itemold.push(messqge1)
              this.storage.set('messages',this.older)
              //console.log(this.older)
            }
          }) 
       


        if (typeof(this.messages) !='undefined') {
          //this.messages.push(messqge1)
        }
        
        this.messageText=''
        if (typeof(this.messages) !='undefined') {
           // this.storage.set('messages',this.messages) 
        }
        //console.log(this.messages)
        




    //}
   
  }
  Getmessage(){
        let messages2=new Array();
        this.storage.get('messages').then((mes:Array<Message>)=>{
        //this.messages=mes;
        if (!(mes)) {
          this.messages=new Array();
        }else{
          for (let index = 0; index < mes.length; index++) {
            const message = mes[index];
            if (message.sender==this.data.name) {
               this.messages.push(message) 
            }
            
          }
        }
    }) 
   // console.log(this.messageText)
  }

  allMs(){
    let messages2=new Array();
    this.storage.get('messages').then((mes:Array<Message>)=>{
        if (!(mes)) {
          this.messages=new Array();
        }else{
          for (let index = 0; index < mes.length; index++) {
            const message = mes[index];
            if (message.sender==this.data.name) {
              this.messages.push(message) 
            }
            
          }
          return this.messages;
        }
    }) 
  }


  shortName(shortname:string):string {
    var str = shortname; 
    return  str.substr(0,2).toUpperCase()
    //return str.toUpperCase(); 
  }

  
}
class Message{
  'sender':string;
  'message':string;
  'date':string;
  'numero':string;
  'nomexp':string;
}
