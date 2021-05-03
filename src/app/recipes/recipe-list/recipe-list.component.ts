import {Component, OnDestroy, OnInit} from '@angular/core'
import {RecipeModel} from '../recipe.model'
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import * as fromApp from '../../store/app.reducer'
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[]
  subscription: Subscription

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
      .pipe(
        map(recipesState => recipesState.recipes)
      )
      .subscribe((recipes: RecipeModel[]) => {
        this.recipes = recipes
      })
    this.recipes = this.recipeService.getRecipes()
  }

  onNewRecipes() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
