import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Observable } from 'rxjs';
import { UserInterface } from './user-interface';
import { UserStateInterface } from './user-state-interface';

const initialState: UserStateInterface = {
  users: [],
  selectedUserId: undefined
}


@Injectable({
  providedIn: 'root'
})
export class UserStateService extends StateService<UserStateInterface> {
  users$: Observable<UserInterface[]> = this.select(state => state.users);

  selectedUser$: Observable<UserInterface | undefined> = this.select(state => {
    return state.users.find(user => user.id === state.selectedUserId)
  })

  constructor() {
    super(initialState);
  }

}
