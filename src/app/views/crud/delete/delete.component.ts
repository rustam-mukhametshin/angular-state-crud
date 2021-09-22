import { Component, OnInit } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { FacadeService } from '../../../store/facade.service';
import { UserEnum } from '../../../enums/user-enum';
import { UserInterface } from '../../../interfaces/user-interface';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  id: any;
  successMsg: any;

  constructor(
    private readonly facadeService: FacadeService,
  ) {
  }

  ngOnInit(): void {

    this.facadeService.user(UserEnum.selectedUser$).pipe(
      switchMap((user: UserInterface) => this.facadeService.user(UserEnum.deleteUser, user)),
      take(1)
    )
      .subscribe()
  }


}
