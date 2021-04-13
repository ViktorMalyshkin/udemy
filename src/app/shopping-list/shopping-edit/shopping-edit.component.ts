import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { IngredientModel } from '../../shared/ingredient.model'
import {ShoppingListService} from "../../services/shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef
  @ViewChild('amountInput') amountInputRef: ElementRef

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onAddItem(): void {
    const ingName = this.nameInputRef.nativeElement.value
    const ingAmount = this.amountInputRef.nativeElement.value
    const newIngredient = new IngredientModel(ingName, ingAmount)
    this.shoppingListService.addIngredient(newIngredient)
  }
}
