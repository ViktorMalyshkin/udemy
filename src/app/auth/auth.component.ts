import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder.directive";
import * as fromApp from '../store/app.reducer'
import {Store} from "@ngrx/store";
import * as AuthActions from './store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true
  isLoading = false
  error = null

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective

  private closeSub: Subscription

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading
      this.error = authState.authError
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return
    }
    const email = authForm.value.email
    const password = authForm.value.password

    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password)
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}))
    } else {
      authObs = this.authService.signup(email, password)
    }

    // authObs.subscribe(resData => {
    //   console.log('resData', resData)
    //   this.isLoading = false
    //   this.router.navigate(['/recipes'])
    // }, errorMessage => {
    //   console.log('errorMessage', errorMessage)
    //   this.error = errorMessage
    //   this.showErrorAlert(errorMessage)
    //   this.isLoading = false
    // })

    authForm.reset()
  }

  onHandleError() {
    this.error = null
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent()
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)

    componentRef.instance.message = message
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
    })
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }
}
