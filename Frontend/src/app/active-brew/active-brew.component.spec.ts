import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBrewComponent } from './active-brew.component';

describe('ActiveBrewComponent', () => {
  let component: ActiveBrewComponent;
  let fixture: ComponentFixture<ActiveBrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveBrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveBrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
