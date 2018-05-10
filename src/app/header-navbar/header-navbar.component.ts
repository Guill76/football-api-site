import { Component, OnInit,OnDestroy } from '@angular/core';
import { UsersService } from '../users.service';
import { TimerService } from '../timer.service';
import { NotificationService } from '../notification.service';
import { LiveService} from '../live.service';
import { ConfigService } from '../config.service';


@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})

export class HeaderNavbarComponent implements OnInit,OnDestroy {
  constructor(public usrSrv : UsersService, public notifSrv: NotificationService, public live : LiveService, private config : ConfigService) { 
  }

  ngOnInit() {
    this.usrSrv.loadFromCache();
    this.live.init();
  }
  isConnected(){
    return ( this.usrSrv.isConnected() );
  }
  getUser(){
    return ( this.usrSrv.getConnectedUser() );
  }
  ngOnDestroy(){
  }

  close(){
    this.notifSrv.notif=null;
  }
  closeLive(){
    this.live.show=false;
  }

}
