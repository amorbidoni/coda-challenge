import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MiaAuthInterceptor,
  MiaAuthModule,
  MIA_AUTH_PROVIDER,
} from '@agencycoda/mia-auth';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MiaCoreModule,
  MIA_GOOGLE_STORAGE_PROVIDER,
} from '@agencycoda/mia-core';
import { MiaTableModule } from '@agencycoda/mia-table';
import { MiaFormModule } from '@agencycoda/mia-form';
import { MiaLoadingModule } from '@agencycoda/mia-loading';
import { TableComponent } from './table/table.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component';
import { MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    EditableTableComponent,
    ModalConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Agency Coda Modules
    MiaCoreModule,
    MiaAuthModule,
    MiaTableModule,
    MiaLoadingModule,
    MiaFormModule,
  ],
  providers: [
    {
      provide: MIA_AUTH_PROVIDER,
      useValue: {
        baseUrl: environment.baseUrl,
      },
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MiaAuthInterceptor,
      multi: true,
    },
    {
      provide: MIA_GOOGLE_STORAGE_PROVIDER,
      useValue: {
        bucket: environment.cloudStorageBucket,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
