import {Component, OnDestroy, OnInit} from '@angular/core'
import {IngredientModel} from '../../shared/ingredient.model'
import {ShoppingListService} from "../../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription
  editMode = false
  editedItemIndex: number

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index
      this.editMode = true
    })
  }

  onAddItem(form: NgForm): void {
    const value = form.value
    const newIngredient = new IngredientModel(value.name, value.amount)
    this.shoppingListService.addIngredient(newIngredient)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
