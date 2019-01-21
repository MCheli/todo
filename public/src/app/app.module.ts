import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { DemoMaterialModule } from './material-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, BottomSheetOverviewExampleSheet } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { CountdownTimerModule } from 'ngx-countdown-timer';


@NgModule({
  declarations: [
    AppComponent,
    BottomSheetOverviewExampleSheet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    DemoMaterialModule
    ],
  entryComponents: [
    BottomSheetOverviewExampleSheet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
