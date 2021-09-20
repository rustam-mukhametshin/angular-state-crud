import { UserInterface } from '../../interfaces/user-interface';

export class UserFixture {
  user: UserInterface = {
    id: 1,
    username: 'test1',
    email: 'email1',
    phone: 199999999
  };
  user2: UserInterface = {
    id: 1,
    username: 'test2',
    email: 'email2',
    phone: 299999999
  }
  users: UserInterface[] = [
    {
      id: 1,
      username: 'test1',
      email: 'email1',
      phone: 199999999
    },
    {
      id: 2,
      username: 'test2',
      email: 'email2',
      phone: 299999999
    },
    {
      id: 3,
      username: 'test3',
      email: 'email3',
      phone: 399999999
    }
  ]
  users2: UserInterface[] = [
    {
      id: 4,
      username: 'test4',
      email: 'email4',
      phone: 499999999
    },
    {
      id: 5,
      username: 'test5',
      email: 'email5',
      phone: 599999999
    },
    {
      id: 6,
      username: 'test6',
      email: 'email6',
      phone: 699999999
    }
  ]
}
