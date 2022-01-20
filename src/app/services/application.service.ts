import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(@Inject(WINDOW) private window: Window) {
  }

  getHostname() : string {
    return this.window.location.hostname;
  }

  getHref() : string {
    return this.window.location.href;
  }

  getPort() : string {
    return this.window.location.port;
  }

  getPathname() : string {
    return this.window.location.pathname;
  }

  getHost() : string {
    return this.window.location.host;
  }

  getOrigin() : string {
    return this.window.location.origin;
  }
}
