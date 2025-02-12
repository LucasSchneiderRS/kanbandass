import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletaProjetoDialogComponent } from './deleta-projeto-dialog.component';

describe('DeletaProjetoDialogComponent', () => {
  let component: DeletaProjetoDialogComponent;
  let fixture: ComponentFixture<DeletaProjetoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DeletaProjetoDialogComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(DeletaProjetoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
