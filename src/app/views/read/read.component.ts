import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserStateService } from '../../store/user-state.service';
import { UserInterface } from '../../store/user-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadComponent implements OnInit {

  user$: Observable<UserInterface | undefined> = this.userStateService.selectedUser$;

  constructor(
    private readonly userStateService: UserStateService
  ) {
  }

  ngOnInit(): void {
  }

}
