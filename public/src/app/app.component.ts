import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private taskService: TasksService) { }

  text = '';
  tasks: Observable<Array<any>>;

  ngOnInit() {
    this.taskService.getTasks().subscribe(resp => {
      this.tasks = resp;
    });
  }

  createTask(text) {
    this.taskService.createTask(this.text).subscribe(resp => {
      this.tasks = resp;
    });
  }
}
