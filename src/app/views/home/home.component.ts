import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserStateService } from '../../store/user-state.service';
import { UserInterface, UserInterface as User } from '../../interfaces/user-interface';
import { Observable } from 'rxjs';
import { UserFacadeService } from '../../store/user-facade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  @Input()
  users$: Observable<User[]> | undefined;

  labels: string[] | undefined;

  constructor(
    private readonly userStateService: UserStateService,
    private readonly userFacadeService: UserFacadeService
  ) {
  }

  ngOnInit(): void {
    this.users$ = this.userFacadeService.getUsers();
    this.labels = [
      'ID',
      'Username',
      'Email',
      'Phone'
    ]
  }

  selectUser(user: UserInterface) {
    this.userStateService.selectUser(user)
  }

}
