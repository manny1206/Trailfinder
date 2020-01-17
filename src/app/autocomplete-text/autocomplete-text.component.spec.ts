import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteTextComponent } from './autocomplete-text.component';

describe('AutocompleteTextComponent', () => {
  let component: AutocompleteTextComponent;
  let fixture: ComponentFixture<AutocompleteTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
