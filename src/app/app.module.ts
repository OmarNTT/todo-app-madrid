import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TaskService } from './task.service';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DragDropModule} from 'primeng/dragdrop';
import { TaskContainerComponent } from './components/task-container/task-container.component';
import {BadgeModule} from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { TaskFormComponent } from './components/task-form/task-form.component';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
@NgModule({
  
  declarations: [
    AppComponent,
    TaskContainerComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ButtonModule,
    DragDropModule,
    CardModule,
    BadgeModule,
    ChipModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    FormsModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
