import { Component, OnInit } from '@angular/core';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'coda-test-angular';
  constructor(private clientService: ClientService) {}
  ngOnInit() {
    this.getMockData();
  }
  data!: any;
  getMockData() {
    this.clientService.getClientList().subscribe((res: any) => {
      this.data = res.response;
    });
  }
}
