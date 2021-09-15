import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../../store/user-interface';
import { UserStateService } from '../../store/user-state.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userForm: FormGroup;
  disabled: boolean = false;
  user: UserInterface | undefined;

  constructor(
    private readonly userStateService: UserStateService
  ) {
    this.userForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  reset() {

  }

  submit() {
    if (this.userForm.errors) {
      return;
    }
    // Todo: UUID
    const newUser: UserInterface = {
      id: 123,
      ...this.userForm.value,
    } as UserInterface;

    this.userStateService.create(newUser);
  }
}
