import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private router: Router, private usersSrv : UsersService, private _notificationService:NotificationService) { }

  ngOnInit() {
    if ( this.usersSrv.isConnected() ){
      this.usersSrv.deconnect();
      this._notificationService.notify("L'Utilisateur "+this.usersSrv.users.username+" a été déconnecté","SUCCESS",10000);
      console.log("user "+this.usersSrv.users.username+" has been deconnected");
    }
    this.router.navigate(['login']);
  }


}
