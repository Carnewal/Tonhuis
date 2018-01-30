import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-th-modal-content',
    templateUrl: './thmodal.component.html'
  })
export default class ThModalComponent {
    @Input() product: Object;
    constructor(public activeModal: NgbActiveModal) {}
}
