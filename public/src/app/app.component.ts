import { Component, OnInit, HostListener } from '@angular/core';
import { TasksService } from './tasks.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private taskService: TasksService) { }

  text = '';
  tasks: Array<any>;
  selectedOptions = [];
  selectedTab = 0;

  ngOnInit() {
    this.taskService.getTasks().subscribe(resp => {
      this.tasks = resp;
    });


  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {    
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      if(this.selectedTab < 3){
        this.selectedTab++;
      }
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      if(this.selectedTab > 0){
        this.selectedTab--;
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    this.tasks.forEach(function(task, index) {
      task.order = index;
    });

    this.taskService.updateTasks(this.tasks).subscribe(resp => {
      this.tasks = resp;
    });
  }

  createTask(text) {
    this.taskService.createTask(this.text).subscribe(resp => {
      this.tasks = resp;
      this.text = '';
    });
  }

  deleteTask(task) {
    this.taskService.deleteTask(task).subscribe(resp => {
      this.tasks = resp;
    });
  }

  updateTask(value, task) {
    task.text = value;
    this.taskService.updateTask(task).subscribe(resp => {
      this.tasks = resp;
    });
  }
}
