import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLocale } from './select-locale';

describe('SelectLocale', () => {
  let component: SelectLocale;
  let fixture: ComponentFixture<SelectLocale>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectLocale]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectLocale);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
