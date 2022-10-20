import { Component, OnInit, Output } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Task } from '../../task'

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {
  popUp: boolean = false;

  allTasks: Task[] = [];

  selectedTaskForm: any = {};

  tasksByStatus = {
    notstarted: [] as Task[],
    started:    [] as Task[],
    finished:   [] as Task[]
  }

  constructor(private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  showPopUp(task: Task) {
    this.popUp = true;

    const allStatus = {
      notstarted: { name: 'Not Started', code: 'notstarted' },
      started:    { name: 'Started', code: 'started' },
      finished:   { name: 'Finished', code: 'finished' }
    }

    const allPriorities = [
      { name: 'Low', code: 1 },
      { name: 'Medium', code: 2 },
      { name: 'Urgent', code: 3 }
    ]
    
    this.selectedTaskForm = {
      id:         task.id,
      title:      task.title,
      description:task.description,
      priority:   allPriorities[task.priority!-1],
      status:   allStatus[task.status!]
    };
  }
  getData() {
    this.taskService.getTask().subscribe(response => {
      this.allTasks = response;
      this.tasksByStatus = {
        notstarted: this.allTasks.filter(task => task.status == 'notstarted').sort((a: any, b: any) => b.priority - a.priority),
        started:    this.allTasks.filter(task => task.status == 'started').sort((a: any, b: any) => b.priority - a.priority),
        finished:   this.allTasks.filter(task => task.status == 'finished').sort((a: any, b: any) => b.priority - a.priority),
      }
      this.updateRemainingTasks()
    })
  }
  allowDrop(ev: any) {
    ev.preventDefault();

  }
  drag(ev: any) {
    ev.dataTransfer.setData("data", ev.target.id);
    console.log("Drag started");
  }

  drop(ev: any, status: "notstarted" | "started" | "finished") {
    ev.preventDefault();
    let id = ev.dataTransfer.getData("data");
    console.log(ev)

    const taskToUpdate:Task = this.allTasks.find((task) => task.id === parseInt(id)) as Task;

    this.taskService
      .updateTask({ ...taskToUpdate, status })
      .subscribe(() => {
        this.moveTask(taskToUpdate, status)
      }
      );

  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.deleteTaskFromList(task);
    });
  }

  moveTask(task:Task, dest:"notstarted" | "started" | "finished"){
    this.deleteTaskFromList(task)
    const destList = this.tasksByStatus[dest];
    task.status = dest;
    destList.push(task);
    destList.sort((a: any, b: any) => b.priority - a.priority)

    this.updateRemainingTasks()
  }

  deleteTaskFromList(task:Task){
    const orgList = this.tasksByStatus[task.status!];
    const index = orgList.indexOf(task);
    orgList.splice(index,1);

    this.updateRemainingTasks()
  }

  filterByPrio(status:"notstarted" | "started" | "finished", prio:number){
    const filteredList = this.allTasks.filter((task)=>(task.status==status && task.priority==prio))
    this.tasksByStatus[status] = filteredList;
  }

  updateRemainingTasks(){
    const numRemainingTasks = this.tasksByStatus.notstarted.length + this.tasksByStatus.started.length;
    this.taskService.taskNumber = String(numRemainingTasks)
  }

  allTasksByStatus(status:"notstarted" | "started" | "finished"){
    this.tasksByStatus[status] = this.allTasks.filter(task => task.status == status).sort((a: any, b: any) => b.priority - a.priority);
  }

}
