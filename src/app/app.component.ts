import {Component, OnInit} from '@angular/core'
import {LoggingService} from "./logging.service";
import {Store} from "@ngrx/store";
import * as AuthActions from "./auth/store/auth.actions";
import * as fromApp from "./store/app.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'udemy-course-project'

  // loadedFeature = 'recipe'

  constructor(private store: Store<fromApp.AppState>, private loggingService: LoggingService) {
  }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin())
    this.loggingService.printLog('Hello from AppComponent ngOnInit')
  }

  // onNavigate(feature: string): void {
  //   this.loadedFeature = feature
  // }
}
