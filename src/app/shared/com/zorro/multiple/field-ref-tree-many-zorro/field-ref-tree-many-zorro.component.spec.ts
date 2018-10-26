import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRefTreeManyZorroComponent } from './field-ref-tree-many-zorro.component';

describe('FieldRefTreeManyZorroComponent', () => {
  let component: FieldRefTreeManyZorroComponent;
  let fixture: ComponentFixture<FieldRefTreeManyZorroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldRefTreeManyZorroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldRefTreeManyZorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
