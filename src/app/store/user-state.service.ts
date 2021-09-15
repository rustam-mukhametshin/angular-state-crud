import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UserInterface } from './user-interface';
import { UserStateInterface } from './user-state-interface';
import { UserService } from '../services/user.service';

const initialState: UserStateInterface = {
  users: [],
  selectedUserId: undefined
}


@Injectable({
  providedIn: 'root'
})
export class UserStateService extends StateService<UserStateInterface> {
  users$: Observable<UserInterface[]> = this.select(state => state.users)
    .pipe(
      shareReplay({refCount: true, bufferSize: 1})
    )
  ;

  selectedUser$: Observable<UserInterface | undefined> = this.select(state => {
    return state.users.find(user => user.id === state.selectedUserId)
  })

  constructor(
    private readonly userService: UserService
  ) {
    super(initialState);

    this.init();
  }

  addUser(user: UserInterface) {
    this.setState({
      users: [
        ...this.state.users,
        user,
      ]
    })
  }

  selectUser(user: UserInterface) {
    this.setState({
      selectedUserId: user.id
    })
  }

  // Service API

  create(user: UserInterface) {
    this.userService.createUser(user).subscribe((newUser) => {
      this.setState({
        users: [...this.state.users, newUser],
        selectedUserId: newUser.id,
      });
    });
  }

  delete(user: UserInterface) {
    this.userService.deleteUser(user).subscribe(() => {
      this.setState({
        selectedUserId: undefined,
        users: this.state.users.filter((item) => item.id !== user.id),
      });
    });
  }

  update(user: UserInterface) {
    this.userService.updateUser(user).subscribe((updatedUser) => {
      this.setState({
        users: this.state.users.map((item) => (item.id === user.id ? updatedUser : item)),
      });
    });
  }

  private init() {
    this.userService.getUsers().subscribe(users => this.setState({users}))
  }

}
