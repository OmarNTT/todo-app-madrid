import { Component } from '@angular/core';
import { TaskService } from './task.service';
import {Task} from './task'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app-madrid';
  draggedTask ?: Task;
  taskNumber : string = '0';
  allTasks: Task[] = [];
  popUp: boolean = false;

  constructor(public taskService : TaskService){
    taskService.getTask().subscribe(response => console.log(response))
  }
  test(){
    console.log('Omar pesao 💩')
  }
  getTaskNumber(){
    this.taskService.getTask().subscribe(response => {
      this.allTasks = response;
      let notStarted = this.allTasks.filter(task => task.status == 'notstarted').length;
      let started = this.allTasks.filter(task => task.status == 'started').length;
      let sum = notStarted + started;
      this.taskService.taskNumber = String(sum);
      console.log(this.taskNumber)

    })
  }

  ngOnInit(): void {
    this.getTaskNumber();
 }

 showPopUp(){
  this.popUp = true;
 }

}
