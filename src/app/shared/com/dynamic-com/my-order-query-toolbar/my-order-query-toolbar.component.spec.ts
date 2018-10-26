import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderQueryToolbarComponent } from './my-order-query-toolbar.component';

describe('MyOrderQueryToolbarComponent', () => {
  let component: MyOrderQueryToolbarComponent;
  let fixture: ComponentFixture<MyOrderQueryToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrderQueryToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrderQueryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
