import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/task';
import { TaskContainerComponent } from '../task-container/task-container.component';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() add: boolean = false;
  @Input() taskForm = {
    id : undefined,
    title: '',
    description: '',
    status: { name: 'Not Started', code: 'notstarted' },
    priority:  { name: 'Low', code: 1 }
  };

  status = [
    { name: 'Not Started', code: 'notstarted' },
    { name: 'Started', code: 'started' },
    { name: 'Finished', code: 'finished' },
  ]
  
  priority = [
    { name: 'Low', code: 1 },
    { name: 'Medium', code: 2 },
    { name: 'Urgent', code: 3 }
  ]
  

  constructor(private taskSv: TaskService) {
  }

  ngOnInit(): void {

  }

  createTask() {
    if (this.taskForm.title != '') {
      let newTask: Task = this.formToTask();
      this.taskSv.addTask(newTask).subscribe(()=>window.location.reload());
    } else {
      console.log('Could not create task, must have a title')
    }
  }

  updateTask() {
    let newTask: Task = this.formToTask();
    this.taskSv.updateTask(newTask).subscribe(()=>window.location.reload())
  }

  formToTask():Task{
    let newTask: Task = { 
      id:this.taskForm.id,
      title: this.taskForm.title, 
      description: this.taskForm.description, 
      status: this.taskForm.status.code as "notstarted"|"started"|"finished", 
      priority: this.taskForm.priority.code 
    };
    return newTask;
  }

}
