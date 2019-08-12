import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'DIO',
      'THE WORLD, Tomare',
      'https://i.kym-cdn.com/photos/images/original/000/974/149/f82.png',
      [
        new Ingredient('Time freeze', 510),
        new Ingredient('Muda Muda', 91)
      ]),
    new Recipe(
      'DIO',
      'THE WORLD, Tomare, Oraaaa',
      'https://i.kym-cdn.com/photos/images/original/000/974/149/f82.png',
      [
        new Ingredient('Time freeze', 50),
        new Ingredient('Muda Muda', 98)
      ])
  ];

  constructor( private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
