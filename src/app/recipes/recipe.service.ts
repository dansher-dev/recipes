import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  /*private recipes: Recipe[] = [
    new Recipe(
      'Korean Ground Beef and Rice Bowls',
      'Such a simple meal with all the flavor! ',
      'https://therecipecritic.com/wp-content/uploads/2017/04/0C4A8325-667x1000.jpg',
      [
        new Ingredient('rice', 10),
        new Ingredient('beef', 1)
      ]),
    new Recipe(
      'Firecracker Chicken',
      'Crispy chicken tossed in a sweet and spicy sauce',
      'https://www.dinneratthezoo.com/wp-content/uploads/2017/10/firecracker-chicken-1.jpg',
      [
        new Ingredient('Chicken', 1.5),
        new Ingredient('Sauce', 1)
      ])
  ];*/
  private recipes: Recipe[] = [];

  constructor( private slService: ShoppingListService) { }

  public setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.slService.addIngredients(ingredients);
  }

  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  public getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  public deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
