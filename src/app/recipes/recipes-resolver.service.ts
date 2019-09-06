import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageSv: DataStorageService, private recipesService: RecipeService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> {
    const recipes: Recipe[] = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageSv.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
