import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-stepper',
  template: `
    <mat-horizontal-stepper>
      <div *ngFor="let step of field.fieldGroup; let index = index; let last = last;">
        <mat-step>
          <ng-template matStepLabel>{{ step.templateOptions?.label }}</ng-template>
          <formly-field [field]="step"></formly-field>

          <div>
            <button matStepperPrevious *ngIf="index !== 0"
                    class="btn btn-primary"
                    type="button">
              Previous
            </button>

            <button matStepperNext *ngIf="!last"
                    class="btn btn-primary mr-2" type="button"
                    [disabled]="!isValid(step)">
              Cancel
            </button>

            <button matStepperNext *ngIf="!last"
                    class="btn btn-primary" type="button"
                    [disabled]="!isValid(step)">
              Next
            </button>

            <button *ngIf="last" class="btn btn-primary"
                    [disabled]="!form.valid"
                    type="submit">
              Save
            </button>
          </div>
        </mat-step>
      </div>

    </mat-horizontal-stepper>
  `,
  styles: [
    `
      button {
        margin-right: 2px
      }
    `
  ]
})
export class FormlyFieldStepper extends FieldType {
  // @ts-ignore
  isValid(field: FormlyFieldConfig) {
    if (field.key) {
      // @ts-ignore
      return field.formControl.valid;
    }

    // @ts-ignore
    return field.fieldGroup.every(f => this.isValid(f));
  }
}
