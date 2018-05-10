import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  // readonly baseUrlApi="http://192.168.1.11";
  // readonly baseUrlApi="http://localhost";
  // readonly baseUrlApi="http://guilouguilou.hopto.org";
  readonly baseUrlApi = 'http://vps336197.ovh.net';
  readonly wsUrl = 'ws://vps336197.ovh.net';
  // readonly wsUrl="ws://192.168.1.11";
  // readonly wsUrl="ws://localhost";
  liveTimer = 120000;
  slowLiveTimer = 600000;
  constructor() { }

}
