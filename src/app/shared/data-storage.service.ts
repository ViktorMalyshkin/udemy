import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeModel} from "../recipes/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) {
  }

  
}
