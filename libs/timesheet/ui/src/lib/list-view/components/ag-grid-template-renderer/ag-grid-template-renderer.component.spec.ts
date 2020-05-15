import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTemplateRendererComponent } from './ag-grid-template-renderer.component';

describe('AgGridTemplateRendererComponent', () => {
  let component: AgGridTemplateRendererComponent;
  let fixture: ComponentFixture<AgGridTemplateRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridTemplateRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTemplateRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
