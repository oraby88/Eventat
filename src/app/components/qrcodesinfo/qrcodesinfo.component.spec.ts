import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodesinfoComponent } from './qrcodesinfo.component';

describe('QrcodesinfoComponent', () => {
  let component: QrcodesinfoComponent;
  let fixture: ComponentFixture<QrcodesinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrcodesinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodesinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
