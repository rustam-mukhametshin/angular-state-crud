import { Component, OnInit } from '@angular/core';
import { first, switchMap } from 'rxjs/operators';
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
        switchMap(user => this.userFacadeService.deleteUser(user)),
        first()
      )
      .subscribe()
  }


}
