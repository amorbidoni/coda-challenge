import {
  MiaField,
  MiaFormConfig,
  MiaFormModalComponent,
  MiaFormModalConfig,
} from '@agencycoda/mia-form';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss'],
})
export class ModalConfirmationComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() newModalConfirmationEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  dialog: any;
  constructor(private clientService: ClientService) {}
  @Input() user!: any;
  closeModal(e: boolean) {
    this.newModalConfirmationEvent.emit(e);
  }

  ngOnInit() {}
}
