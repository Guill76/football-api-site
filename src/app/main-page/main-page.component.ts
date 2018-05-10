import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, ValidatorFn} from '@angular/forms';
import { Subscription } from 'rxjs/rx';




import { NotificationService } from '../notification.service';
import { UsersService } from '../users.service';
import { FootDbApiService } from '../foot-db-api.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  userConnected : string;
  rForm:FormGroup;
  private allUsersObservable: any;
  private newUserObservable: any;
  private delUserObservable: any;
  private updatedUserObservable:any;
  
  notifDuration=10000;
  newUserResp:any;
  updUserResp:any;
  delUserResp:any;
  userRole: string;
  editedUser:any;
  allUsers: any;
  //footApiData:any;
  editMode:boolean=false;
  formTitle:string="User Edition";
  constructor(public userSrv : UsersService, private router : Router, private notifServ: NotificationService) { }
  ngOnInit() {
    this.rForm=new FormGroup({
      '_id': new FormControl(null),
      'username': new FormControl(null, Validators.required),
      'password':  new FormControl(null, [Validators.required,Validators.minLength(5)]),
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'role': new FormControl(null, [Validators.required]),
      'isConnected': new FormControl(false)
    });
    //if (this.userRole=="admin"){
      if ( ! this.userSrv.isConnected() ){
        this.userSrv.loadFromCache();
        this.router.navigate(['login']);
      }else{
        this.userConnected=this.userSrv.getConnectedUser();
        this.userRole=this.userSrv.getRole();
        //console.log(this.timer.pTime);
        if (this.userRole==='admin'){
          console.log("appel des users");
          try{
          this.allUsersObservable=this.userSrv.getAllUsers();
          this.allUsersObservable.subscribe(data=>{
            this.allUsers=data;
          });
          }catch(err){
            this.notifServ.notify(err.message,'WARN',3000);
          }
          //this.getDataFootApi();
        }
      }
   // }
  }
  update(obj){
    if (this.userRole=="admin"){
      this.editedUser=obj;
      this.editMode=true;
      this.rForm.setValue(obj);
      console.log('Form has been updated',this.rForm);
    }else {
      this.notifServ.notify("Privilèges insuffisants","WARN",this.notifDuration);
      console.warn("cette action requiert les droits admin");
    }
  }
  
  
  refreshUsers(){
    this.allUsersObservable=this.userSrv.getAllUsers();
    this.allUsersObservable.subscribe(data=>{
          this.allUsers=data;
    });
  }
  
  addUser(){
    if (this.userRole=="admin"){
      this.editMode=true;
      this.rForm.reset();
      this.editedUser=null;
    }else{
      this.notifServ.notify("Privilèges insuffisants","WARN",this.notifDuration);
    }
  }
  private validateNewNUser(){
    console.log("try to create Neuw user");
    if (this.userRole=="admin"){
      this.newUserObservable=this.userSrv.addUser(this.editedUser);
      this.newUserObservable.subscribe(resp=>{
            this.newUserResp=resp;
            if (this.newUserResp._id){
              console.log(this.newUserResp);
              this.notifServ.notify("L' utilisateur "+this.newUserResp.username+" a été créé avec succès ","SUCCESS",this.notifDuration);
              this.refreshUsers();
              this.closeForm();
            }else {
              this.notifServ.notify("L' utilisateur "+this.newUserResp.username+" n'a pu etre créé :Problème survenu","WARN",this.notifDuration);
            }
      });
    }else {
      this.notifServ.notify("Privilèges insuffisants","WARN",this.notifDuration);
      console.warn("cette action requiert les droits admin");
    }
  }

  private validateUpdatedUser(){
    if (this.userRole=="admin"){
      console.log("try to update user"+ this.editedUser.username);
      this.updatedUserObservable=this.userSrv.updateUser(this.editedUser);
      console.log(this.updatedUserObservable);
      if (this.updatedUserObservable){
        this.updatedUserObservable.subscribe(resp=>{
              this.updUserResp=resp;
              console.log("Backend response",this.updUserResp);
              if (this.updUserResp.ok==1)
                this.notifServ.notify("L'Utilisateur "+this.editedUser.username+" a été modifié avec succès","SUCCESS",this.notifDuration);
              else {
                this.notifServ.notify("L' utilisateur "+this.editedUser.username+" n'a pu être modifié :","WARN",this.notifDuration);
                console.warn(this.updUserResp.name+" - "+this.updUserResp.message);
              }
              this.refreshUsers();
              this.closeForm();
        },
        err=>{
          this.updUserResp=err;
          console.log("erreur",err);
          this.notifServ.notify("L' utilisateur "+this.editedUser.username+" n'a pu être modifié , ERR:"+this.updUserResp.name+" - "+this.updUserResp.message,"WARN",this.notifDuration);
        });
      }else{

      }
    }else {
          console.warn("cette action requiert les droits admin");
          this.notifServ.notify("Privilèges insuffisants","WARN",this.notifDuration);
    }
  }
  delete(obj){
    if (this.userRole=="admin"){
      if (confirm("Voulez-vous vraiment supprimé?")){
      this.delUserObservable=this.userSrv.deleteUser(obj);
      this.delUserObservable.subscribe(resp=>{
        this.delUserResp=resp;
        if (this.delUserResp.ok==1){
            this.notifServ.notify("L'Utilisateur "+obj.username+" a été supprimé avec succès","SUCCESS",this.notifDuration);
        }else{
          this.notifServ.notify("L'Utilisateur "+obj.username+" n' a pas été supprimé..: "+this.delUserResp.name+" - "+this.delUserResp.message,"WARN",this.notifDuration);
        }
        console.log(this.delUserResp);
        this.refreshUsers();
      }); 
      }else this.notifServ.notify("Suppression annulée.","WARN",this.notifDuration);
    }else{
      this.notifServ.notify("Privilèges insuffisants","WARN",this.notifDuration);
    }
    
  }
  onValidate(){
    if (this.userRole=="admin"){
      this.editedUser=this.rForm.value;
      this.editedUser.isConnected=false;
      //console.log(this.rForm);
      if (!this.editedUser._id){
        this.validateNewNUser();
      }else{
        if (this.editedUser){
          this.validateUpdatedUser(); 
        }
      }
    }else console.warn("cette action requiert les droits admin");
  }
  closeForm(){
    this.editMode=false;
  }
}
