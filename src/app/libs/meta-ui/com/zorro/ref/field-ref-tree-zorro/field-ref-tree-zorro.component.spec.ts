import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRefTreeZorroComponent } from './field-ref-tree-zorro.component';

describe('FieldRefTreeZorroComponent', () => {
  let component: FieldRefTreeZorroComponent;
  let fixture: ComponentFixture<FieldRefTreeZorroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldRefTreeZorroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldRefTreeZorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
