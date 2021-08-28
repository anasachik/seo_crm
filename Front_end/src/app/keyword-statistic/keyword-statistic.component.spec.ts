import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordStatisticComponent } from './keyword-statistic.component';

describe('KeywordStatisticComponent', () => {
  let component: KeywordStatisticComponent;
  let fixture: ComponentFixture<KeywordStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
