import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../../interfaces/user-interface';
import { first } from 'rxjs/operators';
import { FacadeService } from '../../store/facade.service';
import { UserEnum } from '../../enums/user-enum';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  disabled: boolean = false;
  user: UserInterface | undefined;
  model!: {};
  fields!: FormlyFieldConfig[];

  constructor(
    private readonly facadeService: FacadeService
  ) {
    this.form = new FormGroup({});
    this.model = {};
    this.fields = [
      {
        key: 'username',
        type: 'input',
        templateOptions: {
          label: 'User name',
          placeholder: 'Enter name',
          required: true,
        },
        validators: [
          Validators.required
        ]
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email address',
          placeholder: 'Enter email',
          required: true,
          type: 'email',
        },
        validators: [
          Validators.email,
          Validators.required
        ]
      },
      {
        key: 'phone',
        type: 'input',
        templateOptions: {
          label: 'Phone',
          placeholder: 'Enter phone',
          type: 'tel',
        },
        validators: []
      },
    ];
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

    this.facadeService.user(UserEnum.createUser, newUser).pipe(first())
      .subscribe()
    ;
  }
}
