import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../../store/user-state.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  id: any;
  successMsg: any;

  constructor(
    private readonly userStateService: UserStateService
  ) {
  }

  ngOnInit(): void {
  }


}
