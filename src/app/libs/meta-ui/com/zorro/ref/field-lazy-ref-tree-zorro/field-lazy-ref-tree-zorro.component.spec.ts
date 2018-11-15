import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldLazyRefTreeZorroComponent } from './field-lazy-ref-tree-zorro.component';

describe('FieldLazyRefTreeZorroComponent', () => {
  let component: FieldLazyRefTreeZorroComponent;
  let fixture: ComponentFixture<FieldLazyRefTreeZorroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldLazyRefTreeZorroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldLazyRefTreeZorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
