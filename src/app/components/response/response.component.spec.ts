import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseComponent } from './response.component';

describe('ResponseComponent', () => {
  let component: ResponseComponent;
  let fixture: ComponentFixture<ResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResponseComponent]
    });
    fixture = TestBed.createComponent(ResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
