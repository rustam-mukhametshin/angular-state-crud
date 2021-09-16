import { Injectable } from '@angular/core';
import { UserStateService } from './user-state.service';
import { UserInterface } from './user-interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserFacadeService extends UserStateService {

  updateUser(user: UserInterface) {
    this.update(user);
  }

  deleteUser(user: UserInterface | undefined) {
    this.delete(user);
  }

  createUser(newUser: UserInterface) {
    this.create(newUser);
  }
}
