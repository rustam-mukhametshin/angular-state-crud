import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FacadeService } from '../../../store/facade.service';
import { Observable, Subject } from 'rxjs';
import { StepInterface } from '../../../interfaces/step.interface';
import { StepEnum } from '../../../enums/step-enum';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LastInfoService } from '../../../services/addition/last-info.service';

@Component({
  selector: 'app-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StepPageComponent implements OnInit, OnDestroy {

  configs$!: Observable<StepInterface>;
  lastInfo$!: Observable<StepInterface>;

  private subs$ = new Subject<void>()

  constructor(
    private readonly facadeService: FacadeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly httpClient: HttpClient,
    private readonly lastInfoService: LastInfoService
  ) {
    this.lastInfo$ = this.lastInfoService.obs$;
  }

  ngOnInit() {
    this.configs$ = this.facadeService.step(StepEnum.getConfigs);

    this.setInitialValues()
      .pipe(takeUntil(this.subs$))
      .subscribe()
    ;
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
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
