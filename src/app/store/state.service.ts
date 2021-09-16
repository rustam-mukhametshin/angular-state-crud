import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class StateService<T> {
  private state$: BehaviorSubject<T>;

  /**
   * Init state
   *
   * @param initialState
   */
  constructor(
    initialState: T
  ) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  /**
   * Current state snapshot
   * @protected
   */
  protected get state(): T {
    return this.state$.getValue();
  }

  /**
   * When emit new state call function.
   *
   * @param mapFn
   * @protected
   */
  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    )
  }

  /**
   * Accept Partial and
   * emit new state object.
   *
   * @param newState
   * @protected
   */
  protected setState(newState: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...newState
    })
  }
}
