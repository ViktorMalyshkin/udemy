import {EventEmitter} from '@angular/core'
import {RecipeModel} from '../recipes/recipe.model'
//
// @Injectable({
//   providedIn: 'root',
// })
export class RecipeService {
  recipeSelected = new EventEmitter<RecipeModel>()

  private recipes: RecipeModel[] = [
    new RecipeModel('A Test Recipe', 'This is simply a test', 'https://static.onecms.io/wp-content/uploads/sites/9/2020/03/19/birria-tacos-FT-RECIPE0420-1.jpg'),
    new RecipeModel('Another Test Recipe', 'This is simply a test', 'https://static.onecms.io/wp-content/uploads/sites/9/2020/03/19/birria-tacos-FT-RECIPE0420-1.jpg'),
  ]

  constructor() {
  }

  getRecipes() {
    return this.recipes.slice()
  }
}
