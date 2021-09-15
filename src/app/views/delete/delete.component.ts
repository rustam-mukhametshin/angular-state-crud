import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../../store/user-state.service';
import { take } from 'rxjs/operators';

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
    this.userStateService.selectedUser$
      .pipe(
        take(1)
      )
      .subscribe(user => {
        this.userStateService.delete(user);
      })
  }


}
