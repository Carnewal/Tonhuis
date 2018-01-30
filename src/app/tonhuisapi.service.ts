import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TonhuisAPIService {

    private API_ROOT = 'http://www.tonhuis.be';

    constructor(private http: HttpClient) {}

    getInitialData() {
        return Observable.forkJoin(
            this.getSiteTexts(),
            this.getProducts(),
            this.getSpotlightProduct(),
            this.getTestimonials()
        );
    }

    getSiteTexts() {
        return this.http.get(`${this.API_ROOT}/content/api/1.1/tables/site_text/rows`);
    }
    getProducts() {
        return this.http.get(`${this.API_ROOT}/content/api/1.1/tables/products/rows`);
    }
    getSpotlightProduct() {
        return this.http.get(`${this.API_ROOT}/content/api/1.1/tables/spotlight_product/rows`);
    }
    getTestimonials() {
        return this.http.get(`${this.API_ROOT}/content/api/1.1/tables/testimonials/rows`);
    }
}
