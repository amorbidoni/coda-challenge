import { MiaPagination } from '@agencycoda/mia-core';
import { MiaTableComponent, MiaTableConfig } from '@agencycoda/mia-table';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private clientService: ClientService) {}
  @ViewChild('tableComp') tableComp!: MiaTableComponent;

  showTable: boolean = false;
  tableConfig: MiaTableConfig = new MiaTableConfig();

  mockData!: MiaPagination<any>;
  shownEditTable: boolean = false;

  selectedUserId!: number;
  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig() {
    this.tableConfig.service = this.clientService;
    this.tableConfig.id = 'table-test';
    this.tableConfig.columns = [
      // { key: 'selection', type: 'selection', title: '' },
      {
        key: 'Nombre',
        type: 'user',
        title: 'Nombre',
        extra: {
          field_firstname: 'firstname',
        },
      },
      {
        key: 'Apellido',
        type: 'user',
        title: 'Apellido',
        extra: {
          field_lastname: 'lastname',
        },
      },
      {
        key: 'Email',
        type: 'user',
        title: 'Email',
        extra: {
          field_subtitle: 'email',
        },
      },
      {
        key: 'more',
        type: 'more',
        title: '',
        extra: {
          actions: [
            { icon: 'create', title: 'Edit', key: 'edit' },
            { icon: 'delete', title: 'Delete', key: 'remove' },
          ],
        },
      },
    ];

    this.tableConfig.loadingColor = 'red';
    this.tableConfig.hasEmptyScreen = true;
    this.tableConfig.emptyScreenTitle =
      'No tenes cargado ningun elemento todavia';

    this.tableConfig.onClick.subscribe((result) => {
      switch (result.key) {
        case 'edit':
          this.titleModal = 'Editar usuario   ';
          this.selectedUserEdit = result.item;
          this.handleModalEditTable({ showModal: true, reloadPage: false });
          break;
        case 'remove':
          this.confirmationModal = true;
          break;
        default:
          break;
      }
      this.selectedUserId = result.item.id;
    });

    this.clientService.getClientList().subscribe((res: any) => {
      this.mockData = res.response;
    });
  }
  //
  handleModalEditTable(e: { showModal: boolean; reloadPage: boolean }) {
    this.shownEditTable = e.showModal;
    e.reloadPage && this.tableComp.loadItems();
    console.log(e.reloadPage);
  }
  titleModal: string = 'Editar usuario   ';
  confirmationModal: boolean = false;
  handleConfirmationModal(e: boolean) {
    if (e === true) {
      this.clientService.deleteClient(this.selectedUserId).subscribe((res) => {
        this.tableComp.loadItems();
      });
    }
    this.confirmationModal = false;
  }
  selectedUserEdit!: any;

  handleAddUser() {
    this.titleModal = 'Crear usuario   ';
    this.selectedUserEdit = {};
    this.shownEditTable = true;
  }
}
