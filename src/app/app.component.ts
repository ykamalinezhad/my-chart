import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string;
  public form: FormGroup;

  constructor(private fb: FormBuilder, 
    private httpClient : HttpClient
    ) {
  }
  ngOnInit() {
    this.title = 'my-project';
    this.form = this.fb.group({
      timeWindow: [null],
      symbolPairs: [null]
    });
  }

  ngOnDestroy() {}
}
  
  
  

  

