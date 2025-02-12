import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTarefaDialogComponent } from './editar-tarefa-dialog.component';

describe('EditarTarefaComponent', () => {
  let component: EditarTarefaDialogComponent;
  let fixture: ComponentFixture<EditarTarefaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EditarTarefaDialogComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(EditarTarefaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
