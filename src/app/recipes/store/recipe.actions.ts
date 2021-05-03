import {Action} from "@ngrx/store";
import {RecipeModel} from "../recipe.model";

export const SET_RECIPES = '[Recipes] Set Recipes'

export class SetRecipes implements Action{
  readonly type = SET_RECIPES
  constructor(public payload: RecipeModel[]) {
  }
}

export type RecipesActions = SetRecipes
