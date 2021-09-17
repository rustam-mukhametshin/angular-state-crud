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
  ): Observable<UserInterface> | Observable<UserInterface[]> | Observable<void> | void {
    switch (method) {
      case UserEnum.selectUser:
        this.userStateService.selectUser(user as UserInterface);
        break;
      case UserEnum.getUsers:
        return this.userStateService.users$;
      case UserEnum.updateUser:
        return this.userStateService.update(user as UserInterface);
      case UserEnum.deleteUser:
        return this.userStateService.delete(user as UserInterface);
      case UserEnum.createUser:
        return this.userStateService.create(user as UserInterface);
      default:
        return this.userStateService.users$;
    }
  }
}
