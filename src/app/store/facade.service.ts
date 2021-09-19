import { Injectable } from '@angular/core';
import { UserEnum } from '../enums/user-enum';
import { UserStateService } from './user-state.service';
import { UserInterface } from '../interfaces/user-interface';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export enum EnumStates {
  User
}

@Injectable(
  {
    providedIn: 'root',
  }
)
export class FacadeService {

  constructor(
    private readonly userStateService: UserStateService,
  ) {
    // Todo
    // If error retry 3 time
    this.init(EnumStates.User)
      .pipe(take(1))
      .subscribe();
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
        this.userStateService.selectUser(user);
        break;
      case UserEnum.getUsers:
        return this.userStateService.users$;
      case UserEnum.updateUser:
        return this.userStateService.update(user);
      case UserEnum.deleteUser:
        return this.userStateService.delete(user);
      case UserEnum.createUser:
        return this.userStateService.create(user);
      case UserEnum.selectedUser$:
        return this.userStateService.selectedUser$;
      default:
        return this.userStateService.users$;
    }
  }

  /**
   * Set initial values from <T>service API to <T>State
   *
   * @param type
   * @private
   */
  init(type: EnumStates): Observable<any> {
    switch (type) {
      case EnumStates.User:
        return this.userStateService.init();
      default:
        return this.userStateService.init();
    }
  }
}
