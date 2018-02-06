import { Component, OnInit, HostListener } from '@angular/core';
import { TonhuisAPIService } from './tonhuisapi.service';
import { Observable } from 'rxjs/Observable';
import { MarkdownService } from 'ngx-md';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ThModalComponent } from './thmodal/thmodal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TonhuisAPIService]
})

export class AppComponent implements OnInit {
  public siteText = [];
  public products = [];
  public testimonials = [];

  public isPageLoading = true;
  public isNavbarCollapsed = true;
  public isPageScrolled = false;
  public defaultProductsShown = 8;
  public showAllProducts = false;
  public currentDate = new Date();

  public visitorName = '';
  public visitorEmail = '';
  public visitorMessage = '';
  public closeResult = '';

  constructor(
    private _tonhuisAPIService: TonhuisAPIService,
    private _markdown: MarkdownService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this._markdown.renderer.link = (href: string, title: string, text: string) => {
      return `<a href="${href}" target="_blank">${text}</a>`;
    };
    this.getInitialData();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (window.scrollY > 50) {
      this.isPageScrolled = true;
    } else {
        this.isPageScrolled = false;
    }
  }

  openProductModal(product) {
    const modal = this.modalService.open(ThModalComponent, { windowClass: 'ths-modal', size: 'lg' });
    modal.componentInstance.product = product;
    modal.result.then(
      (result) => { console.log('result', result); },
      (reason) => { console.log('reason', reason); }
    );
  }


  getInitialData() {
    this._tonhuisAPIService.getInitialData().subscribe(
      data => {
        this.siteText = data[0]['data'];
        this.products = data[1]['data'];
        this.testimonials = data[3]['data'];
       },
      err => console.error(err),
      () => {
        this.isPageLoading = false;
      } // Hides loader spinner
    );
  }

  getSiteText(name) {
    const text = this.siteText.find(t => t.name === name);
    return text ? text.content : '';
  }
}
