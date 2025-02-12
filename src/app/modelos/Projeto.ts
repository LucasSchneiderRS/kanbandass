import { Tarefa } from '../modelos/Tarefa';

export interface Projeto {
    status: string
    nomeProjeto: string
    codigo : number
    descricao: string
    objetivo: string
    dataCriacao: Date
    responsavel: string
    equipe: string[]
    dataEntrega: Date
    tarefas: Tarefa []
    prioridade: string
}