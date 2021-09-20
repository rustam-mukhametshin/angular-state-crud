import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowDynamic]'
})
export class ShowDynamicDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) {
  }

}
