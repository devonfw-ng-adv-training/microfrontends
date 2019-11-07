import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroRowComponent } from './hero-row.component';

describe('HeroRowComponent', () => {
  let component: HeroRowComponent;
  let fixture: ComponentFixture<HeroRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
