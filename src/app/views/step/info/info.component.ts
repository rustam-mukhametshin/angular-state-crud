import { Component, Input, OnInit } from '@angular/core';
import { StepInterface } from '../../../interfaces/step.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  // Todo: remove any type
  @Input() configs$!: Observable<StepInterface>;
  @Input() title!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
