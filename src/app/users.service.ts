
import {throwError as observableThrowError,  Observable ,  Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response ,Headers} from '@angular/http';
import { ConfigService} from './config.service';
import { NotificationService } from './notification.service'
import { WebsocketService } from './websocket.service';





@Injectable()
export class UsersService {
  users;
  datas;
  wsSub$:Subject<any>; //websocketSubject 
  errorMsg;
  connectionMessage;
  connected: string[]=[];
  constructor(private http: Http, public config: ConfigService, public ws:WebsocketService, public notifSrv:NotificationService) {
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError (error  : Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return observableThrowError(error);
  }

  authenticate(user):Observable<any>{
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.config.baseUrlApi+'/api/auth',user).map(this.extractData).catch(this.handleError.bind(this));
  }
  addUser(user):Observable<any>{
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.config.baseUrlApi+'/api/user',user).map(this.extractData).catch(this.handleError.bind(this));
  }
  updateUser(user):Observable<any>{
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.config.baseUrlApi+'/api/user',user).map(this.extractData).catch(this.handleError.bind(this));
  }
  deleteUser(user):Observable<any>{
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.config.baseUrlApi+'/api/users/'+user._id).map(this.extractData).catch(this.handleError.bind(this));
  }

  getUser(name : string):Observable<any>{
    return this.http.get(this.config.baseUrlApi+'/api/users/'+name)
     .map(this.extractData)
     .catch(this.handleError.bind(this));
  }
  
  getAllUsers(){
     return this.http.get(this.config.baseUrlApi+'/api/allusers/')
     .map(this.extractData).catch(this.handleError) ;
  }
  
  getRole(){
    //console.log(this.users.role);
    if (this.users){
      return this.users.role;
    }else return null;
  }

  setConnected(){
    if (this.users){
      this.users.isConnected=true;
      this.users.password='';
      localStorage.setItem('key-meanapp', JSON.stringify(this.users));
      this.wsSub$=this.ws.connect(`${this.config.wsUrl}`);
      setTimeout(()=>{
        this.connectionMessage={
          type: 'login',
          value: this.getConnectedUser()
        }
        this.wsSub$.next(this.connectionMessage);
      },100);
      this.wsSub$.subscribe((resp)=>{
        console.log("websocket",resp);
        if(resp.type=="sINFO") this.notifSrv.notify(resp.value,'INFO',3000);
        else if ( resp.type=="aUSERS"){
          if (resp.value.length>0){
            console.log("vidage du tableau",this.connected);
            this.connected.splice(0,this.connected.length);
            console.log("Tableau vidé",this.connected);

            resp.value.forEach(user => {
              this.connected.push(user);
              console.log(this.connected);
              //setTimeout(()=>{this.notifSrv.notify(`${user} est maintenant connecté`,'INFO',2000);},2500);
            });
          }
        }
      });
    }
  }
  
  loadFromCache(){
    this.users = JSON.parse(localStorage.getItem('key-meanapp'));
    setTimeout(()=>{this.setConnected();},0)
    
  }

  getConnectedUser() {
    //console.log(this.users);
    return (this.users?this.users.username:null);
  }

  deconnect ( ) {
    // on repasse tout à false car ce service n'est propre qu'au gars connecté
    this.users.isConnected=false;
    localStorage.removeItem('key-meanapp');
  }
  
  isConnected ( ) : boolean {
     return (this.users&&this.users.isConnected);
  }
}
