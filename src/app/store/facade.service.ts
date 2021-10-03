import { Injectable } from '@angular/core';
import { UserEnum } from '../enums/user-enum';
import { UserStateService } from './user-state.service';
import { UserInterface } from '../interfaces/user-interface';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StepEnum } from '../enums/step-enum';
import { StepInterface } from '../interfaces/step.interface';
import { StepStateService } from './step-state.service';

export enum EnumStates {
  User,
  Step
}

@Injectable(
  {
    providedIn: 'root',
  }
)
export class FacadeService {

  constructor(
    private readonly userStateService: UserStateService,
    private readonly stepStateService: StepStateService,
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
  init(type: EnumStates): Observable<unknown> {
    switch (type) {
      case EnumStates.User:
        return this.userStateService.init();
      case EnumStates.Step:
        return this.stepStateService.init();
      default:
        return this.userStateService.init();
    }
  }

  step(method: StepEnum.updateConfigs, config: StepInterface): Observable<StepInterface>
  step(method: StepEnum.getConfigs): Observable<StepInterface>
  step(
    method: unknown,
    config?: unknown
  ): unknown {
    switch (method) {
      case StepEnum.updateConfigs:
        return this.stepStateService.update(config);
      case StepEnum.getConfigs:
        return this.stepStateService.getConfig();
      default:
        return this.stepStateService.getConfig();
    }
  }
}
