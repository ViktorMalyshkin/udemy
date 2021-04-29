import {IngredientModel} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";

export interface State {
  ingredients: IngredientModel[],
  editedIngredient: IngredientModel,
  editedIngredientIndex: number,
}

export interface AppState {
  shoppingList: State
}

const initialState: State = {
  ingredients: [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,

}

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, action.payload]}
    case ShoppingListActions.ADD_INGREDIENTS:
      return {...state, ingredients: [...state.ingredients, ...action.payload]}
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index]
      const updateIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      }
      const updateIngredients = [...state.ingredients]
      updateIngredients[action.payload.index] = updateIngredient
      return {...state, ingredients: updateIngredients}
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state, ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== action.payload
        })
      }
    case ShoppingListActions.START_EDIT:
      return {
        ...state, editedIngredientIndex: action.payload, editedIngredient: {...state.ingredients[action.payload]}}
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state, editedIngredientIndex: -1, editedIngredient: null}

    default:
      return state
  }
}
