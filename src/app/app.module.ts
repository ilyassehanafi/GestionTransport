import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './marker.service';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { FormsModule } from '@angular/forms';
const appRoutes: Routes = [
  { path: 'home',
   component: MapComponent
   },
  { path: 'login',
  component: LoginComponent
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
  providers: [MarkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
