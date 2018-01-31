import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThModalComponent } from './thmodal/thmodal.component';


@NgModule({
  declarations: [
    AppComponent,
    ThModalComponent
  ],
  entryComponents: [
    ThModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
