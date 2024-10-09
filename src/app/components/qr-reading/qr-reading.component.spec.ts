import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrReadingComponent } from './qr-reading.component';

describe('QrReadingComponent', () => {
  let component: QrReadingComponent;
  let fixture: ComponentFixture<QrReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
