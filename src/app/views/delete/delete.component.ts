import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { UserFacadeService } from '../../store/user-facade.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  id: any;
  successMsg: any;

  constructor(
    private readonly userFacadeService: UserFacadeService
  ) {
  }

  ngOnInit(): void {
    this.userFacadeService.selectedUser$
      .pipe(
        take(1)
      )
      .subscribe(user => {
        this.userFacadeService.deleteUser(user);
      })
  }


}
