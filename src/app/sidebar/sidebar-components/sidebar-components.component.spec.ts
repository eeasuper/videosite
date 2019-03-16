import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponentsComponent } from './sidebar-components.component';

describe('SidebarComponentsComponent', () => {
  let component: SidebarComponentsComponent;
  let fixture: ComponentFixture<SidebarComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
