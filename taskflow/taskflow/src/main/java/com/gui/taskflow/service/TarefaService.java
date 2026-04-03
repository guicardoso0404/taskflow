package com.gui.taskflow.service;

import com.gui.taskflow.entity.StatusTarefa;
import com.gui.taskflow.entity.Tarefa;
import com.gui.taskflow.exception.TarefaNotFoundException;
import com.gui.taskflow.repository.TarefaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    public Tarefa criar(Tarefa tarefa) {
        tarefa.setId(null);
        tarefa.setDataCriacao(LocalDateTime.now());
        return tarefaRepository.save(tarefa);
    }

    public List<Tarefa> listarTodas() {
        return tarefaRepository.findAll();
    }

    public Tarefa buscarPorId(Long id) {
        return tarefaRepository.findById(id)
                .orElseThrow(() -> new TarefaNotFoundException(id));
    }

    public List<Tarefa> listarPorStatus(StatusTarefa status) {
        return tarefaRepository.findByStatus(status);
    }

    public Tarefa atualizar(Long id, Tarefa novaTarefa) {
        Tarefa tarefa = buscarPorId(id);

        tarefa.setTitulo(novaTarefa.getTitulo());
        tarefa.setDescricao(novaTarefa.getDescricao());
        tarefa.setStatus(novaTarefa.getStatus());
        tarefa.setPrioridade(novaTarefa.getPrioridade());

        return tarefaRepository.save(tarefa);
    }

    public void deletar(Long id) {
        Tarefa tarefa = buscarPorId(id);
        tarefaRepository.delete(tarefa);
    }
}
