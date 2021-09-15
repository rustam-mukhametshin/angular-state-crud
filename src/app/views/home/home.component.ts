import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserStateService } from '../../store/user-state.service';
import { UserInterface } from '../../store/user-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  users: UserInterface[] | undefined;

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

}
