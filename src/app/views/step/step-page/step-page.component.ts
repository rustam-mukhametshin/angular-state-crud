import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FacadeService } from '../../../store/facade.service';
import { Observable } from 'rxjs';
import { StepInterface } from '../../../interfaces/step.interface';
import { StepEnum } from '../../../enums/step-enum';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
    private readonly activatedRoute: ActivatedRoute
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
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '0';
    const currentDate = new Date().toLocaleString().split(',')[0];

    const obs: StepInterface = {
      contextName: 'Demo Sales NL',
      contextID: parseInt(id, 10),
      serverNameFirst: 'DEV3',
      requestDate: currentDate,
      requestor: 'First Last name',
    }

    return this.facadeService.step(StepEnum.updateConfigs, obs);
  }

}
