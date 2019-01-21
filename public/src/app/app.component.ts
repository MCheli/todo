import { Component, OnInit, HostListener } from '@angular/core';
import { TasksService } from './tasks.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import * as moment from 'moment';

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
  constructor(private taskService: TasksService,
    private bottomSheet: MatBottomSheet) { }

  text = '';
  tasks: Array<any>;
  selectedOptions = [];
  selectedTab = 0;
  personal = false;
  public = false;
  clock;

  ngOnInit() {
    this.taskService.getTasks().subscribe(resp => {
      this.tasks = this.filterTasks(resp);
    });

        // Runs the enclosed function on a set interval.
        setInterval(() => {
          this.clock = moment().format('h:mm:ss:SS a');
      }, 10) // Updates the time every second.
  }

  filterTasks(tasks){
    var taskList = tasks.filter(task => (!task.sensitive || !JSON.parse(localStorage.getItem("public"))));
    return taskList;

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

    console.log(this.bottomSheet)
  }

  getTasks(){
    this.taskService.getTasks().subscribe(resp => {
      this.tasks = this.filterTasks(resp);
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
  
  toggleFocus(task){
    task.focus = (task.focus) ? false : true;
    this.taskService.updateTask(task).subscribe(resp => {
      this.tasks = resp;
    });
  }

  toggleSensitive(task){
    task.sensitive = (task.sensitive) ? false : true;
    this.taskService.updateTask(task).subscribe(resp => {
      this.tasks = resp;
    });
  }

  updateTask(value, task) {
    task.text = value;
    this.taskService.updateTask(task).subscribe(resp => {
      this.tasks = resp;
    });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'app.settings.component.html',
})
export class BottomSheetOverviewExampleSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    private taskService: TasksService) {}


  ngOnInit() {
    var storedPublic = localStorage.getItem("public");
    var storedPersonal = localStorage.getItem("personal");

    this.public = (storedPublic != "undefined") ? JSON.parse(storedPublic) : false;
    this.personal = (storedPersonal != "undefined") ? JSON.parse(storedPersonal) : false;
  }

  personal;
  public;

  onChange(){
    localStorage.setItem('public', this.public);
    localStorage.setItem('personal', this.personal);
  }

}