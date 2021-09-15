import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserStateService } from '../../store/user-state.service';
import { UserInterface, UserInterface as User } from '../../store/user-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  @Input()
  users: User[] | undefined;

  labels: string[] | undefined;

  constructor(
    private readonly userStateService: UserStateService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.userStateService.users$.subscribe(users => {
      this.users = users;
      cdr.markForCheck();
    }) // Изменить на async pipe, все равно вызывает markForCheck();
  }

  ngOnInit(): void {
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
