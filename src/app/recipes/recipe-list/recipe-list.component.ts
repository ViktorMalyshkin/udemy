import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { RecipeModel } from '../recipe.model'
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<RecipeModel>()
  recipes: RecipeModel[]

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
  }

  onRecipeSelected(recipe: RecipeModel): void {
    this.recipeWasSelected.emit(recipe)
  }
}
