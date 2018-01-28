import { Component, OnInit } from '@angular/core';
import { TonhuisAPIService } from './tonhuisapi.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TonhuisAPIService]
})

export class AppComponent implements OnInit {
  public siteText = [];
  public products = [];
  public spotlightProduct = [];

  public defaultProductsShown = 4;
  public showAllProducts = false;

  public currentDate = new Date();


  constructor(private _tonhuisAPIService: TonhuisAPIService) { }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this._tonhuisAPIService.getInitialData().subscribe(
      data => {
        this.siteText = data[0]['data'];
        this.products = data[1]['data'];
        this.spotlightProduct = data[2]['data'][0];
       },
      err => console.error(err),
      () => console.log('Done loading initial data', this.siteText, this.products, this.spotlightProduct)
    );
  }

  getSiteText(name) {
    const text = this.siteText.find(t => t.name === name);
    return text ? text.content : '';
  }
}
