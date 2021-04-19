import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { RecipeModel } from '../recipe.model'
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[]

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
  }

  onNewRecipes() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
