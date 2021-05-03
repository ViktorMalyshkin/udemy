import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from "rxjs";
import * as fromApp from '../store/app.reducer'
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as AuthActions from '../auth/store/auth.actions'
import * as RecipesActions from '../recipes/store/recipe.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true
  isAuth = false
  private userSub: Subscription

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuth = !!user
        console.log(!user)
        console.log(!!user)
      })
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes()
    this.store.dispatch(new RecipesActions.StoreRecipes())
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe()
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout())
  }
}
