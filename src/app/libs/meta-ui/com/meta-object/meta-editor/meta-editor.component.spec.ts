import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaEditorComponent } from './meta-editor.component';

describe('MetaEditorComponent', () => {
  let component: MetaEditorComponent;
  let fixture: ComponentFixture<MetaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
