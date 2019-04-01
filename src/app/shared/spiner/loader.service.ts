
import {BehaviorSubject} from 'rxjs';

export class LoaderService {
  private showSpinner = new BehaviorSubject<boolean>(false);

  getSpinner() {
    return this.showSpinner.asObservable();
  }

  showingSpinner() {
    this.showSpinner.next(true);
  }

  hideSpinner() {
    this.showSpinner.next(false);
  }
}
