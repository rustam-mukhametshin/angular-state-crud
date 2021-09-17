import { Injectable } from '@angular/core';
import { UserEnum } from '../enums/user-enum';
import { UserStateService } from './user-state.service';
import { UserInterface } from '../interfaces/user-interface';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class FacadeService {

  constructor(
    private readonly userStateService: UserStateService,
  ) {
  }

  user(
    method: UserEnum,
    user?: UserInterface | null
  ): Observable<UserInterface> | Observable<UserInterface[]> | void {
    switch (method) {
      case UserEnum.selectUser:
        this.userStateService.selectUser(user as UserInterface);
        break;
      case UserEnum.getUsers:
        return this.userStateService.users$;
    }
  }
}
