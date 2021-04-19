import {Component, OnDestroy, OnInit} from '@angular/core'
import {IngredientModel} from '../shared/ingredient.model'
import {ShoppingListService} from "../services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IngredientModel[]
  private idChange = new Subscription

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.idChange = this.shoppingListService.ingredientsChanged.subscribe((ingredients: IngredientModel[]) => {
      this.ingredients = ingredients
    })
  }

  ngOnDestroy(): void {
    this.idChange.unsubscribe()
  }
}
