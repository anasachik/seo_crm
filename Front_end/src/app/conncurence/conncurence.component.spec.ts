import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConncurenceComponent } from './conncurence.component';

describe('ConncurenceComponent', () => {
  let component: ConncurenceComponent;
  let fixture: ComponentFixture<ConncurenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConncurenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConncurenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
