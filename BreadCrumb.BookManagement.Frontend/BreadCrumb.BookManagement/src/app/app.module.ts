import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';  
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BookComponent } from './book.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BookDialogComponent } from './components/create-book/create-book.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    BookComponent,
    BookDialogComponent
  ],
  imports: [
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatGridListModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserModule,
    MatDialogModule,        
    MatFormFieldModule,    
    MatToolbarModule,        
    BrowserAnimationsModule,    
    MatInputModule,
    MatDividerModule,
    MatSelectModule,    
    HttpClientModule,
    BrowserAnimationsModule,    
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers : [{ provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} }],
  bootstrap: [BookComponent],
})
export class AppModule { }


