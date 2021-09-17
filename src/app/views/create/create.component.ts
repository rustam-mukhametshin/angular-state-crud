import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../../interfaces/user-interface';
import { UserFacadeService } from '../../store/user-facade.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  disabled: boolean = false;
  user: UserInterface | undefined;

  constructor(
    private readonly userFacadeService: UserFacadeService
  ) {
    this.form = new FormGroup({
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
    if (this.form.errors) {
      return;
    }
    // Todo: UUID
    const newUser: UserInterface = {
      id: 123,
      ...this.form.value,
    } as UserInterface;

    this.userFacadeService.createUser(newUser)
      .pipe(first())
      .subscribe()
    ;
  }
}
