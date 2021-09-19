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

  user(method: UserEnum.selectUser, user: UserInterface): void
  user(method: UserEnum.getUsers): Observable<UserInterface[]>
  user(method: UserEnum.updateUser, user: UserInterface): Observable<UserInterface>
  user(method: UserEnum.deleteUser, user: UserInterface): Observable<void>
  user(method: UserEnum.createUser, user: UserInterface): Observable<UserInterface>
  user(method: UserEnum.selectedUser$): Observable<UserInterface>
  user(
    method: any,
    user?: any
  ): any {
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
      case UserEnum.selectedUser$:
        return this.userStateService.selectedUser$;
      default:
        return this.userStateService.users$;
    }
  }
}
