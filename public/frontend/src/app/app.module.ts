import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TimeRegistrationsComponent } from './time-registrations/time-registrations.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeRegistrationsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  entryComponents: [TimeRegistrationsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
