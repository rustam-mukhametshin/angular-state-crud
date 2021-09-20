import { Component, ComponentFactoryResolver, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShowDynamicDirective } from '../../directives/show-dynamic.directive';
import { ChildDynamicComponent } from '../child-dynamic/child-dynamic.component';
import { PAGE_VISIBILITY } from '../../tokens/page-visibility.token';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-parent-dynamic',
  templateUrl: './parent-dynamic.component.html',
  styleUrls: ['./parent-dynamic.component.css']
})
export class ParentDynamicComponent implements OnInit, OnDestroy {

  @ViewChild(ShowDynamicDirective, {static: true}) showDynamicDirective!: ShowDynamicDirective;
  private unsubscribe$: Subject<null> = new Subject<null>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(PAGE_VISIBILITY) private readonly pageVisibility: Observable<boolean>
  ) {
  }

  ngOnInit() {
    this.pageVisibility
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(visible => {
        if (visible) {
          this.loadComponent();
          console.log('Show child: ', visible)
        } else {
          console.log('Hide child: ', visible);
          this.loadComponent(false);
        }
      })
  }

  loadComponent(check: boolean = true) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<ChildDynamicComponent>(ChildDynamicComponent);

    const viewContainerRef = this.showDynamicDirective.viewContainerRef;
    viewContainerRef.clear();
    // if (check) {
    const componentRef = viewContainerRef.createComponent<ChildDynamicComponent>(componentFactory);
    componentRef.instance.title = `Child - Wow here is dynamic data ${Date.now()}`;
    // } else {
    //   viewContainerRef.clear();
    // }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
