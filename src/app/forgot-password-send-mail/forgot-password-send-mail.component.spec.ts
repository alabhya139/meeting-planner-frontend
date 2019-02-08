import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordSendMailComponent } from './forgot-password-send-mail.component';

describe('ForgotPasswordSendMailComponent', () => {
  let component: ForgotPasswordSendMailComponent;
  let fixture: ComponentFixture<ForgotPasswordSendMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordSendMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordSendMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
