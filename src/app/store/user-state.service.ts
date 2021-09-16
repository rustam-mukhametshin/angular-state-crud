import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
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
  protected users$: Observable<UserInterface[]> = this.select(state => state.users)
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

  protected create(user: UserInterface): Observable<UserInterface> {
    return this.userService.createUser(user)
      .pipe(
        tap(
          newUser => {
            this.setState({
              users: [...this.state.users, newUser],
              selectedUserId: newUser.id,
            })
          }
        )
      );
  }

  protected delete(user: UserInterface | undefined): Observable<void> {
    return this.userService.deleteUser(user)
      .pipe(
        tap(() => {
          this.setState({
            selectedUserId: undefined,
            users: this.state.users.filter((item) => item.id !== (user ? user.id : null)),
          });
        })
      );
  }

  protected update(user: UserInterface): Observable<UserInterface> {
    return this.userService.updateUser(user)
      .pipe(
        tap(updatedUser => {
          this.setState({
            users: this.state.users.map((item) => (item.id === user.id ? updatedUser : item)),
          });
        })
      );
  }

  private init() {
    this.userService.getUsers().subscribe(users => this.setState({users}))
  }

}
