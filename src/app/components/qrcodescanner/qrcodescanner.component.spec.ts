import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodescannerComponent } from './qrcodescanner.component';

describe('QrcodescannerComponent', () => {
  let component: QrcodescannerComponent;
  let fixture: ComponentFixture<QrcodescannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrcodescannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodescannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
