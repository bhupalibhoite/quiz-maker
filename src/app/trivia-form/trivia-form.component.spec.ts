import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaFormComponent } from './trivia-form.component';

describe('TriviaFormComponent', () => {
  let component: TriviaFormComponent;
  let fixture: ComponentFixture<TriviaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaFormComponent]
    });
    fixture = TestBed.createComponent(TriviaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
