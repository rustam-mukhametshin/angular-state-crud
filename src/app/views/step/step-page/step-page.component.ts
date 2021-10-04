import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FacadeService } from '../../../store/facade.service';
import { Observable } from 'rxjs';
import { StepInterface } from '../../../interfaces/step.interface';
import { StepEnum } from '../../../enums/step-enum';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StepPageComponent implements OnInit {

  configs$!: Observable<StepInterface>;

  constructor(
    private readonly facadeService: FacadeService,
  ) {

  }

  ngOnInit() {
    this.configs$ = this.facadeService.step(StepEnum.getConfigs);

    this.setInitialValues()
      .pipe(take(1))
    ;
  }

  private setInitialValues() {
    // Todo: Change to ActivatedRoute
    const obs: StepInterface = {
      contextName: 'Demo Sales NL',
      contextID: 47,
      serverNameFirst: 'DEV3',
      requestDate: '09/22/2021',
      requestor: 'First Last name',
    }

    return this.facadeService.step(StepEnum.updateConfigs, obs);
  }

}
