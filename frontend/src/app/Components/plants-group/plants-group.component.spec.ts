import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsGroupComponent } from './plants-group.component';

describe('PlantsGroupComponent', () => {
  let component: PlantsGroupComponent;
  let fixture: ComponentFixture<PlantsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
