import { TestBed } from '@angular/core/testing';

import { HeroRowService } from './hero-row.service';

describe('HeroRowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroRowService = TestBed.get(HeroRowService);
    expect(service).toBeTruthy();
  });
});
