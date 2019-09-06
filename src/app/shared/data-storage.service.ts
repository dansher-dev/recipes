import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';

import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  public storeRecipes(): void {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(
      'https://recipe-be-angular.firebaseio.com/recipes.json',
      recipes)
      .subscribe();
  }

  public fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://recipe-be-angular.firebaseio.com/recipes.json',
    )
      .pipe(
      map(recipes => {
        return recipes.map(
          recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          }
        );
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));
  }
}
