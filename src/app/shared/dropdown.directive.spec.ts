import { TestBed, ComponentFixture} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DropdownDirective } from './dropdown.directive';

@Component({
  template: '<div class="btn-group" appDropdown><button class="dropdown-toggle" type="button"> Manage Recipe</button></div>'
})
class TestDropdownComponent {
}


let component: TestDropdownComponent;
let fixture: ComponentFixture<TestDropdownComponent>;
let dropDownEl: DebugElement;

describe('Directive: Dropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDropdownComponent, DropdownDirective]
    });
    fixture = TestBed.createComponent(TestDropdownComponent);
    component = fixture.componentInstance;
    dropDownEl = fixture.debugElement.query(By.css('div'));
  });
  it('clicking on dropdown', () => {
    dropDownEl.nativeElement.click();
    fixture.detectChanges();
    expect(dropDownEl.classes.open).toBe(true);
  });
});
