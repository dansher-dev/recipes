import { TestBed } from '@angular/core/testing';

import { RecipesResolverService } from './recipes-resolver.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecipesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, RouterTestingModule],
    providers: [RecipesResolverService]
  }));

  it('should be created', () => {
    const service: RecipesResolverService = TestBed.get(RecipesResolverService);
    expect(service).toBeTruthy();
  });
});
