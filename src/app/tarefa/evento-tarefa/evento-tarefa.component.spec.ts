import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoTarefaComponent } from './evento-tarefa.component';

describe('EventoTarefaComponent', () => {
  let component: EventoTarefaComponent;
  let fixture: ComponentFixture<EventoTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EventoTarefaComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(EventoTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
