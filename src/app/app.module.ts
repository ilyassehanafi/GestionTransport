import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { FormsModule } from '@angular/forms';
import { InterceptInterceptor } from './intercept.interceptor';
const appRoutes: Routes = [
{ path: 'login',
  component: LoginComponent
},
{ path: 'home',
 component: MapComponent
},
{ path: '**',
   component: MapComponent
}
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    LeafletModule,
    NgbModule,
    LeafletDrawModule,
    FormsModule,
    NgbModalModule,
    RouterModule.forRoot(appRoutes,
      { enableTracing: true })
  ],
  providers: [
    {   provide: HTTP_INTERCEPTORS,
        useClass: InterceptInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
