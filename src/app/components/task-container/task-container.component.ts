import { Component, OnInit, Output } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Task } from '../../task'

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {
  @Output()

  popUp: boolean = false;

  allTasks: Task[] = [];
  todoTask: Task[] = [];
  startedTask: Task[] = [];
  finishedTask: Task[] = [];
  selectedTask: Task = {};
  selected: any;
  priority: any;

  taskNumber: number = this.todoTask.length + this.startedTask.length

  constructor(private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  showPopUp(task: any) {

    this.popUp = true;
    this.selectedTask = task;
    console.log(task.status)
    if (task.status == 'notstarted') {
      this.selected = { name: 'Not Started', code: 'notstarted' }
    }
    if (task.status == 'started') {
      this.selected = { name: 'Started', code: 'started' }
    }
    if (task.status == 'finished') {
      this.selected = { name: 'Finished', code: 'finished' }
    }
    if (task.priority == 1) {
      this.priority = { name: 'Low', code: 1 }
    }
    if (task.priority == 2) {
      this.priority = { name: 'Medium', code: 2 }
    }
    if (task.priority == 3) {
      this.priority = { name: 'Urgent', code: 3 }
    }


    console.log(this.selectedTask)

  }
  getData() {
    this.taskService.getTask().subscribe(response => {
      this.allTasks = response;
      this.todoTask = this.allTasks.filter(task => task.status == 'notstarted').sort((a: any, b: any) => b.priority - a.priority);
      this.startedTask = this.allTasks.filter(task => task.status == 'started').sort((a: any, b: any) => b.priority - a.priority);
      this.finishedTask = this.allTasks.filter(task => task.status == 'finished').sort((a: any, b: any) => b.priority - a.priority);
    })
  }
  allowDrop(ev: any) {
    ev.preventDefault();

  }
  drag(ev: any) {
    ev.dataTransfer.setData("data", ev.target.id);
    console.log("Drag started");
  }
  drop(ev: any, el: any, status: any) {
    console.log(status)
    ev.preventDefault();
    let id = ev.dataTransfer.getData("data");
    el.appendChild(document.getElementById(id));
    const taskToUpdate = this.allTasks.find((task) => task.id === parseInt(id));
    console.log(taskToUpdate)
    this.taskService
      .updateTask({ ...taskToUpdate, status })
      .subscribe((data: any) => {

      }
      );

  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task.id).subscribe((data: any) => this.getData());
    alert('Deleted properly');
    window.location.reload()
  }

}
