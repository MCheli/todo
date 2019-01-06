import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


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

  ngOnInit() {
    this.taskService.getTasks().subscribe(resp => {
      this.tasks = resp;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  createTask(text) {
    this.taskService.createTask(this.text).subscribe(resp => {
      this.tasks = resp;
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
