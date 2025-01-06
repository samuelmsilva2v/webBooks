import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultBooksComponent } from './consult-books.component';

describe('ConsultBooksComponent', () => {
  let component: ConsultBooksComponent;
  let fixture: ComponentFixture<ConsultBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
