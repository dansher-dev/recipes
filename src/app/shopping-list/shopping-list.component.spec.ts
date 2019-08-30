import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListService } from './shopping-list.service';

class MockShoppingService extends ShoppingListService {
  isShopping() {
    return 'Mocked';
  }
}

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let testBedService: ShoppingListService;
  let componentService: ShoppingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ ShoppingListComponent, ShoppingEditComponent ],
      providers: [ShoppingListService]
    });
    TestBed.overrideComponent(
      ShoppingListComponent,
      { set: { providers: [{ provide: ShoppingListService, useClass: MockShoppingService }] } }
    );
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    testBedService = TestBed.get(ShoppingListService);
    componentService = fixture.debugElement.injector.get(ShoppingListService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([ShoppingListService], (injectService: ShoppingListService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be and instance of MockShoppingService', () => {
    expect(componentService instanceof MockShoppingService).toBeTruthy();
  });
});
