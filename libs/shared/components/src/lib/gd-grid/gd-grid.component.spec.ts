import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdGridComponent } from './gd-grid.component';

describe('GdGridComponent', () => {
  let component: GdGridComponent;
  let fixture: ComponentFixture<GdGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
