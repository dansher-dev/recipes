import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemComponent } from './recipe-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Recipe } from '../../recipe.model';
import { Ingredient } from '../../../shared/ingredient.model';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ RecipeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
    component.recipe = new Recipe(
      'Korean Ground Beef and Rice Bowls',
      'Such a simple meal with all the flavor! ',
      'https://therecipecritic.com/wp-content/uploads/2017/04/0C4A8325-667x1000.jpg',
      [
        new Ingredient('rice', 10),
        new Ingredient('beef', 1)
      ]);
    component.index = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
