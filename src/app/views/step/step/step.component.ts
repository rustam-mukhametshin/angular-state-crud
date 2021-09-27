import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StepComponent extends FieldType implements OnInit {

  ngOnInit() {
    console.log('Step c :', this.field?.fieldGroup)
  }


  // @ts-ignore
  isValid(field: FormlyFieldConfig) {
    // console.log(field.key);
    if (field.key) {
      // @ts-ignore
      return field.formControl.valid;
    }

    // @ts-ignore
    return field.fieldGroup.every(f => this.isValid(f));
  }

  checkEditable(index: number, step: any): boolean {
    // console.log(step);

    /*if (field.key) {
      // @ts-ignore
      return field.formControl.valid;
    }*/
    return true;
  }

  checkModelEmpty(obj: {}) {
    return Object.values(obj).filter(v => !!v)
  }

}
