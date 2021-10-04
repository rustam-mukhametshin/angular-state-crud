import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FacadeService } from '../../../store/facade.service';
import { Observable } from 'rxjs';
import { StepInterface } from '../../../interfaces/step.interface';
import { StepEnum } from '../../../enums/step-enum';
import { switchMap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly httpClient: HttpClient
  ) {

  }

  ngOnInit() {
    this.configs$ = this.facadeService.step(StepEnum.getConfigs);

    this.setInitialValues()
      .pipe(take(1))
    ;
  }

  private setInitialValues() {

    const id = this.activatedRoute.snapshot.paramMap.get('id') || '0';
    const currentDate = new Date().toLocaleString().split(',')[0];

    const api_url = `https://jsonplaceholder.typicode.com/users/${id}`;

    return this.httpClient.get(api_url)
      .pipe(
        switchMap((user: any) => {
          const obs: StepInterface = {
            contextName: user.address.city,
            contextID: parseInt(id, 10),
            serverNameFirst: user.website,
            requestDate: currentDate,
            requestor: user.name,
          }

          return this.facadeService.step(StepEnum.updateConfigs, obs);
        })
      )
  }

}
