import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserInterface } from '../../interfaces/user-interface';
import { Observable } from 'rxjs';
import { FacadeService } from '../../store/facade.service';
import { UserEnum } from '../../enums/user-enum';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadComponent implements OnInit {

  user$: Observable<UserInterface | undefined> =
    this.facadeService.user(UserEnum.selectedUser$) as Observable<UserInterface>;

  constructor(
    private readonly facadeService: FacadeService
  ) {
  }

  ngOnInit(): void {
  }

}
