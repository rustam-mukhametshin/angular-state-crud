import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-dynamic',
  templateUrl: './child-dynamic.component.html',
  styleUrls: ['./child-dynamic.component.css']
})
export class ChildDynamicComponent implements OnInit {

  title: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
