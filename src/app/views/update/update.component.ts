import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../../interfaces/user-interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FacadeService } from '../../store/facade.service';
import { UserEnum } from '../../enums/user-enum';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  disabled: boolean = false;
  user: UserInterface | undefined;

  subj$ = new Subject<void>();

  constructor(
    private readonly facadeService: FacadeService
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
    this.form.reset();
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

    // Todo: Сразу отписка
    // @ts-ignore
    this.facadeService.user(UserEnum.updateUser, newUser).pipe(
      takeUntil(this.subj$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subj$.next();
    this.subj$.complete();
  }

}
