import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
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
  ];

  constructor( private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}
