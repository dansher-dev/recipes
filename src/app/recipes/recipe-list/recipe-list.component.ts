import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private recipeService: RecipeService,
              private router: Router,
              private rout: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipesChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (recipes) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  public onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.rout});
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
