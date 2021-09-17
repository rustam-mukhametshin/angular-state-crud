import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserInterface, UserInterface as User } from '../../interfaces/user-interface';
import { Observable } from 'rxjs';
import { FacadeService } from '../../store/facade.service';
import { UserEnum } from '../../enums/user-enum';

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
    private readonly facadeService: FacadeService,
  ) {
  }

  ngOnInit(): void {
    this.users$ = this.facadeService.user(UserEnum.getUsers) as Observable<UserInterface[]>;
    this.labels = [
      'ID',
      'Username',
      'Email',
      'Phone'
    ]
  }

  selectUser(user: UserInterface) {
    this.facadeService.user(UserEnum.selectUser, user);
  }

}
