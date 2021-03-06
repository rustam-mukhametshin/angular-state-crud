import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { UserInterface } from '../interfaces/user-interface';
import { UserStateInterface } from '../interfaces/user-state-interface';
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

    // this.init();
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

  create(user: UserInterface): Observable<UserInterface> {
    return this.userService.createUser(user)
      .pipe(
        tap(
          newUser => {
            this.addUser(newUser);
            this.selectUser(newUser);
          }
        )
      );
  }

  delete(user: UserInterface | undefined): Observable<void> {
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

  update(user: UserInterface): Observable<UserInterface> {
    return this.userService.updateUser(user)
      .pipe(
        tap(updatedUser => {
          this.setState({
            users: this.state.users.map((item) => (item.id === user.id ? updatedUser : item)),
          });
        })
      );
  }

  init(): Observable<null> {
    return this.userService.getUsers()
      .pipe(
        switchMap(users => {
          this.setState({users});
          return of(null);
        })
      );
  }

}
