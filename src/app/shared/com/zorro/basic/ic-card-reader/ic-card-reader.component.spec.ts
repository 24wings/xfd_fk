import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcCardReaderComponent } from './ic-card-reader.component';

describe('IcCardReaderComponent', () => {
  let component: IcCardReaderComponent;
  let fixture: ComponentFixture<IcCardReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcCardReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcCardReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
