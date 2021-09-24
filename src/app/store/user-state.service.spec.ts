import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
// @ts-ignore
import { v4 as uid } from 'uuid';
import { UserStateService } from './user-state.service';
import { UserFixture } from '../services/mocks/UserFixture';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { UserInterface } from '../interfaces/user-interface';
import SpyObj = jasmine.SpyObj;

describe('UserStateService', () => {
  let service: UserStateService;
  const userServiceStateSpy = jasmine.createSpyObj(UserStateService, [
    'addUser',
    'selectUser',
    'create',
    'delete',
    'update',
    'init',
  ]) as SpyObj<UserStateService>;

  let userService: UserService;
  const userServiceSpy = jasmine.createSpyObj(UserService, [
    'getUsers',
    'createUser',
    'updateUser',
    'deleteUser',
    'getUser',

  ]) as SpyObj<UserService>;
  let fixtureData: UserFixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy
        },
        {
          provide: UserStateService,
          useValue: userServiceStateSpy
        },
      ]
    });
    service = TestBed.inject(UserStateService);
    userService = TestBed.inject(UserService);

    fixtureData = new UserFixture;
  });

  beforeEach(() => {
    userServiceSpy.getUsers.and.returnValue(of(fixtureData.users));

    userServiceSpy.getUser.and.callFake((user: UserInterface) => {
      const res = fixtureData.users.filter(u => u.id === user.id);
      return of(res[0]);
    });

    userServiceSpy.updateUser.and.callFake(user => {
      // Get user by ID
      const getUser = fixtureData.users.filter(u => u.id === user.id)[0];
      const i = fixtureData.users.indexOf(getUser);

      // Update user
      const newUser = {
        ...getUser,
        ...user
      };

      // Join users + updated user
      fixtureData.users = fixtureData.users
        .map(u => u.id === user.id ? user : u)

      // Get updated user from list
      const getAddedUser = fixtureData.users.filter(u => u.id === newUser.id)[0];

      // Return updated user
      return of(getAddedUser);
    })

    // Todo: Think
    userServiceSpy.deleteUser.and.callFake((user: UserInterface | undefined) => {
      const i = fixtureData.users.findIndex((el, index) => {
        return el.id === user?.id ? index - 1 : -1;
      });
      fixtureData.users.splice(i, 1);
      return of(undefined);
    })

    userServiceSpy.createUser.and.callFake((user: UserInterface) => {
      // Todo: Do I need it?
      fixtureData.users.push(user);

      const res = fixtureData.users.filter(u => u.id === user.id);
      return of(res[0]);
    });
  });

  beforeEach(() => {
    userServiceStateSpy.init.and.callFake(() => {
      service.users$ = userService.getUsers();
      return of();
    })

    // Todo: addUser
    // Todo: selectUser
    // Todo: create
    // Todo: delete
    // Todo: update
  });

  it('#init should return', done => {
    service.users$.pipe(take(1)).subscribe(users => {
      expect(users).toEqual(fixtureData.users2);
    })
  });

  it('#addUser should add user to State', done => {
    service.addUser(fixtureData.user2);
    service.users$.subscribe(users => {
      const getU = users.filter(u => u.id === fixtureData.user2.id)[0];
      expect(getU).toEqual(fixtureData.user2);
      done();
    })
  });

  xit('#selectUser should return', done => {
    // Todo
    done();
  });

  it('#create should return', done => {
    service.create(fixtureData.user2)
      .subscribe(c => {
        expect(c).toEqual(fixtureData.user2);
      })
  });

  xit('#delete should return', done => {
    // Todo
    done();
  });

  xit('#update should return', done => {
    // Todo
    done();
  });


});
