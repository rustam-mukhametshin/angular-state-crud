import { UserInterface } from './user-interface';

export interface UserStateInterface {
  users: UserInterface[];
  selectedUserId?: number;
}
