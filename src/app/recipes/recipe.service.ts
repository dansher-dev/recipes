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

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
