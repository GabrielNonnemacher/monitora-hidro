import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulLinksPage } from './useful-links';

describe('UsefulLinksPage', () => {
  let component: UsefulLinksPage;
  let fixture: ComponentFixture<UsefulLinksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsefulLinksPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UsefulLinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
