import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRefSelectZorroComponent } from './field-ref-select-zorro.component';

describe('FieldRefSelectZorroComponent', () => {
  let component: FieldRefSelectZorroComponent;
  let fixture: ComponentFixture<FieldRefSelectZorroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldRefSelectZorroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldRefSelectZorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
