import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
declare let bootstrap: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  // https://stackoverflow.com/questions/44053227/how-to-emit-an-event-from-parent-to-child

  @Output() close = new EventEmitter<Event>();
  @Input() show: Observable<void>;
  @Input() title: string = "blogBUSTER";
  @Input() body: string = "";
  @Input() mode: boolean = false; // false->cerrar; true->si/no (no implementado)

  /*
  strModalTittle: string = this.title;
  strModalBody: string = this.body;
  strModalFooter: string = this.footer;
  boolMode: boolean = this.mode;
  */
 
  private eventsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.eventsSubscription = this.show.subscribe(() => this.showModal());
    /*
    this.strModalTittle = this.title;
    this.strModalBody = this.body;
    this.strModalFooter = this.footer;
    this.boolMode = this.mode;
    */
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  showModal = () => {
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
      keyboard: false
    })
    var myModalEl = document.getElementById('myModal')
    myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.close.emit(event);
    })
    myModal.show()
  }

}
