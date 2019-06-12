import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbDialogUploadComponent } from './dumb-dialog-upload.component';

describe('DumbDialogUploadComponent', () => {
  let component: DumbDialogUploadComponent;
  let fixture: ComponentFixture<DumbDialogUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumbDialogUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbDialogUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
