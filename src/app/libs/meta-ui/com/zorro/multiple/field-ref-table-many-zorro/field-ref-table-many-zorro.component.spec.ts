import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRefTableManyZorroComponent } from './field-ref-table-many-zorro.component';

describe('FieldRefTableManyZorroComponent', () => {
  let component: FieldRefTableManyZorroComponent;
  let fixture: ComponentFixture<FieldRefTableManyZorroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldRefTableManyZorroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldRefTableManyZorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
