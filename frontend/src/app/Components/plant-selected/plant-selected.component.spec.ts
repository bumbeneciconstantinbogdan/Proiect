import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSelectedComponent } from './plant-selected.component';

describe('PlantSelectedComponent', () => {
  let component: PlantSelectedComponent;
  let fixture: ComponentFixture<PlantSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantSelectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
