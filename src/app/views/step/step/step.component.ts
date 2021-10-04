import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { StepInterface } from '../../../interfaces/step.interface';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StepComponent extends FieldType implements OnInit {

  @Output() lastInfo = new EventEmitter<StepInterface>()

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

  save() {
    // @ts-ignore
    const values: any = this.field?.fieldGroup[3].fieldGroup.map((c: any) => c.formControl.value)
    const obj: StepInterface = {
      lastInfo: values[0],
      lastInfo2: values[1]
    }

    this.lastInfo.emit(obj);
    // Todo to facade
  }

  checkModelEmpty(obj: {}) {
    return Object.values(obj).filter(v => !!v)
  }

  interacted($event: any, step: any) {
    const values: any | StepInterface = {};

    // Получаем данные текущего шага
    // Преобразуем в объект StepInterface Partial
    step.fieldGroup
      .map((item: any) => {
        return {
          key: item.key,
          value: item.formControl.value
        }
      })
      .forEach((item: any) => {
        values[item.key] = item.value
      })
    ;

    console.log(values);
  }
}
