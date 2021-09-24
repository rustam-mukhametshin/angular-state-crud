import { Component, Input, OnInit } from '@angular/core';
import { MoveCopyInterface } from '../move-copy.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  // Todo: remove any type
  @Input() model!: MoveCopyInterface | any;
  @Input() title!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
