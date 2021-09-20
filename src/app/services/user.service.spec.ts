import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserFixture } from './mocks/UserFixture';
import { take } from 'rxjs/operators';
import { UserInterface } from '../interfaces/user-interface';
// @ts-ignore
import { v4 as uid } from 'uuid';
import SpyObj = jasmine.SpyObj;

describe('TestService', () => {
  let service: UserService;
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
        }
      ]
    });
    service = TestBed.inject(UserService);

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getUsers should return list of Users', done => {
    service.getUsers()
      .pipe(take(1))
      .subscribe(users => {
        expect(users).toEqual(fixtureData.users);
        done();
      })
  });
  it('#createUser should create User and return User', done => {
    const newUser: UserInterface = {
      id: uid(),
      username: 'Unique',
      email: 'test@mail.ru',
      phone: 8888,
    }
    service.createUser(newUser).pipe(take(1))
      .subscribe(user => {
        expect(user).toEqual(newUser);
        done();
      })
  });
  it('#updateUser should update User', done => {
    const newUser: UserInterface = {
      id: 1,
      username: 'Unique',
      email: 'email1',
      phone: 199999999
    }

    service.updateUser(newUser).pipe(take(1))
      .subscribe(user => {
        expect(user).toEqual(newUser);
        done();
      })
  });
  // Todo: Think
  it('#deleteUser should delete User', done => {
    service.deleteUser(fixtureData.user).pipe(take(1))
      .subscribe(res => {
        expect(res).toBeFalsy();
        done();
      })
  });
  it('#getUser should get User', done => {
    service.getUser(fixtureData.user)
      .pipe(take(1))
      .subscribe(user => {
        expect(user).toEqual(fixtureData.user);
        done();
      })
  });


});
