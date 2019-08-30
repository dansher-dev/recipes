import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailComponent } from './recipe-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  template: '<div class="row"><div class="col-xs-12"><h2>{{ recipe.name }}</h2></div></div>'
})
class RecipeDetailTestComponent extends RecipeDetailComponent implements OnInit {
  ngOnInit() {
    this.recipe = new Recipe(
      'Korean Ground Beef and Rice Bowls',
      'Such a simple meal with all the flavor! ',
      'https://therecipecritic.com/wp-content/uploads/2017/04/0C4A8325-667x1000.jpg',
      [
        new Ingredient('rice', 10),
        new Ingredient('beef', 1)
      ]);
    this.id = 1;
  }
}

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ RecipeDetailComponent, RecipeDetailTestComponent ]
    });
    fixture = TestBed.createComponent(RecipeDetailTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
