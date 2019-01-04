import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private taskService: TasksService) { }

  title = null;

  ngOnInit() {
    this.taskService.getTasks().subscribe(resp => {
      // display its headers
      console.log(resp);
      this.title = resp.info;
    });
  }
}
