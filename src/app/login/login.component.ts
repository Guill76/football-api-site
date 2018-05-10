import { Component, OnInit} from '@angular/core';
import { UsersService} from '../users.service';
import { NotificationService} from '../notification.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { WebsocketService } from '../websocket.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

export class mFormControl extends FormControl {
  constructor(formState?: any, alertMsg?: string | null, 
    validator?: ValidatorFn | ValidatorFn[] | null, 
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
      super(formState, validator, asyncValidator);
      this.msgErr=alertMsg;
  };
  msgErr: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  title = 'Authentification';
  rForm: FormGroup;
  login: string;
  authenticationErr=false;
  wsSub$:Subject<any>;
  connectionMessage;
  canConnect:boolean=false;
  isAuthenticated: boolean;
  password: string;
  post: any;
  res:any;
  
  public constructor( private usersService: UsersService, private router:Router, private notifSrv:NotificationService,private ws:WebsocketService ){
  }
  
  ngOnInit(){
    this.rForm=new FormGroup({
      'login': new mFormControl(null,"Champ login Obligatoire", Validators.required),
      'password':  new mFormControl(null, "Longueur min: 5 caractères", [Validators.required,Validators.minLength(5)])
    });
    if ( this.usersService.isConnected() ){
      this.router.navigate(['main']);
    }else {
      this.rForm.setAsyncValidators(this.userCanAccess.bind(this));
    }
  }
 
  public userCanAccess(control:FormGroup):any{
    console.log("asynchronous user checking service for access: ",this.usersService);
    return this.usersService.authenticate({username:control.controls.login.value,password:control.controls.password.value}).map(
      res=>{
        if (res) {
          if (res.isConnected){
            this.canConnect=true;
            this.usersService.users=res;
            this.usersService.users.isConnected=false;
            this.isAuthenticated=false;
            return null;
          }
          else {
            this.usersService.users=null;
            return {cannotLog:true};
          };
        }
        else {
          this.isAuthenticated=false;
          this.authenticationErr = true;
          return {cannotLog:true};
        }
      }
    );
  }

  public connect(){
    if (this.canConnect){
      this.usersService.setConnected();
      this.notifSrv.notify("Bienvenue "+this.usersService.users.username+" !! tu es maintenant connecté avec un role "+this.usersService.users.role,"SUCCESS",5000);
     
      this.isAuthenticated=true;
      this.router.navigate(['main']); 
    }else{
          this.notifSrv.notify("Connexion impossible ! Veuillez réessayer","WARN",5000);
          this.login=null;
          this.rForm.get('login').reset();
          this.password=null;
          this.rForm.get('password').reset();
          this.authenticationErr = true;
    }

  }
}

