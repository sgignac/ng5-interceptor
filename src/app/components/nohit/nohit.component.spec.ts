import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NohitComponent } from './nohit.component';

describe('NohitComponent', () => {
  let component: NohitComponent;
  let fixture: ComponentFixture<NohitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NohitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NohitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
