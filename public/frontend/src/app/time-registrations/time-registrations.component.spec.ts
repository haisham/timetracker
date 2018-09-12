import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRegistrationsComponent } from './time-registrations.component';

describe('TimeRegistrationsComponent', () => {
  let component: TimeRegistrationsComponent;
  let fixture: ComponentFixture<TimeRegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeRegistrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
