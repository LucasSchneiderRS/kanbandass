import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleHorasComponent } from './controle-horas.component';

describe('ControleHorasComponent', () => {
  let component: ControleHorasComponent;
  let fixture: ComponentFixture<ControleHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ControleHorasComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ControleHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
