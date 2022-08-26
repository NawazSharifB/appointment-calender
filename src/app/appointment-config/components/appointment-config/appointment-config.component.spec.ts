import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentConfigComponent } from './appointment-config.component';

describe('AppointmentConfigComponent', () => {
  let component: AppointmentConfigComponent;
  let fixture: ComponentFixture<AppointmentConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
