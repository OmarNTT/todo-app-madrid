import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/task';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() add: boolean = false;
  @Input() selectedTask: Task = {};
  @Input() id2: any;
  @Input() title2: any = '';
  @Input() desc2 ?: string = '';
  @Input() status2 : any ={ code: 'notstarted' };
  @Input() prio2 : any = 1;

  title: string = ''
  description: string = '';
  status = [
    { name: 'Not Started', code: 'notstarted' },
    { name: 'Started', code: 'started' },
    { name: 'Finished', code: 'finished' },
  ]
  selectedStatus: any = { name: 'Not Started', code: 'notstarted' };
  priority = [
    { name: 'Low', code: 1 },
    { name: 'Medium', code: 2 },
    { name: 'Urgent', code: 3 }
  ]
  selectedPriority: any = { name: 'Low', code: 1 };

  constructor(private taskSv: TaskService) {
    //   console.log(this.add);
    //   console.log(this.selectedTask)
    //   if (this.add == false){
    //     this.title  = this.selectedTask.title  || '';
    //     this.description = this.selectedTask.description || '';
    //     this.selectedStatus =  this.status.find(task => {task.code == this.selectedTask.status}) ;
    //     this.selectedPriority = this.priority.find(task => {task.code == this.selectedTask.priority}); 
    //   }
  }

  ngOnInit(): void {

  }

  createTask() {

    if (this.title != '') {
      let newTask: Task = { title: this.title, description: this.description, status: this.selectedStatus.code, priority: this.selectedPriority.code };
      console.log(newTask)
      this.taskSv.addTask(newTask);
      console.log('Task was created correctly!' + newTask);
      window.location.reload()

    } else {
      console.log('Could not create task, must have a title')
    }
  }

  updateTask() {
    let newTask: Task = {id: this.id2, title: this.title2, description: this.desc2, status:this.status2.code, priority:this.prio2.code}
    console.log(newTask);
    this.taskSv.updateTask(newTask).subscribe((data:any)=>window.location.reload())
    
  }
}
