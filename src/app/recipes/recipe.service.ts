import {Injectable} from '@angular/core'
import {RecipeModel} from './recipe.model'
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action'

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanged = new Subject<RecipeModel[]>();

  // private recipes: RecipeModel[] = [
  //   new RecipeModel(
  //     'Tasty Schnizel',
  //     'A super-tasty Schnizel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [
  //       new IngredientModel('Meat', 1),
  //       new IngredientModel('French Fries', 20),
  //     ]),
  //   new RecipeModel(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [
  //       new IngredientModel('Buns', 2),
  //       new IngredientModel('Meat', 1),
  //     ]),
  // ]
  private recipes: RecipeModel[] = []

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: IngredientModel[] } }>) {
  }


  setRecipes(recipes: RecipeModel[]){
    this.recipes = recipes
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    // this.shoppingListService.addIngredients(ingredients)
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
  }

  addRecipe(recipe: RecipeModel){
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: RecipeModel){
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes.slice())
  }
}
