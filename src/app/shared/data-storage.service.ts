import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeModel} from "../recipes/recipe.model";
import {RecipeService} from "../services/recipe.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    return this.http.put('https://udemy-course-recipe-book-4a524-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
      response => {
        console.log(response)
      }
    )
  }

}
