import {
  MiaField,
  MiaFormConfig,
  MiaFormModalComponent,
  MiaFormModalConfig,
} from '@agencycoda/mia-form';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-editable-table',
  template: ``,
})
export class EditableTableComponent implements OnInit {
  @Output() newCloseModalEvent = new EventEmitter<boolean | any>();

  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditableTableComponent>
  ) {}

  @Input() user!: any;

  data = new MiaFormModalConfig();
  config = new MiaFormConfig();
  ngOnInit() {
    this.loadModal();
  }
  @Input() modalTitle!: string;
  loadModal() {
    this.data.item = this.user;
    this.data.service = this.clientService;
    this.data.titleNew = this.modalTitle;
    this.data.titleEdit = this.modalTitle;
    this.config.hasSubmit = false;
    this.config.fields = [
      {
        key: 'firstname',
        type: MiaField.TYPE_STRING,
        label: 'Nombre',
        validators: [Validators.required],
      },
      {
        key: 'lastname',
        type: MiaField.TYPE_STRING,
        label: 'Apellido',
        validators: [Validators.required],
      },
      {
        key: 'email',
        type: MiaField.TYPE_STRING,
        label: 'Email',
        validators: [
          Validators.required,
          Validators.email,
          Validators.pattern(this.emailPattern),
        ],
      },
    ];
    this.config.errorMessages = [
      { key: 'required', message: 'El campo "%label%" es requerido.' },
      { key: 'pattern', message: 'El "%label%" ingresado no es correcto.' },
    ];

    this.data.config = this.config;
    let userExist = this.user.id;
    return this.dialog
      .open(MiaFormModalComponent, {
        width: '520px',
        panelClass: 'modal-full-width-mobile',
        data: this.data,
      })
      .afterClosed()
      .subscribe((result) => {
        if (!!userExist) {
          this.newCloseModalEvent.emit({ showModal: false, reloadPage: false });
        } else {
          this.newCloseModalEvent.emit({ showModal: false, reloadPage: true });
        }
      });
  }
}
