import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {IngredientModel} from '../shared/ingredient.model';
import {LoggingService} from "../logging.service";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action'
import * as fromShoppingList from "./store/shopping-list.reducer";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: IngredientModel[] }>;
  private subscription = new Subscription;


  constructor(
    private loggingService: LoggingService,
    private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')
    this.store
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: IngredientModel[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit')
  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
