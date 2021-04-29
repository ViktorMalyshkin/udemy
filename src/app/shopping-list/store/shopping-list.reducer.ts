import {IngredientModel} from "../../shared/ingredient.model";
import {Action} from "@ngrx/store";
import {ADD_INGREDIENT} from "./shopping-list.action";

const initialState = {
  ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
  ]
}

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, action]}
  }
}
