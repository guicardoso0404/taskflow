package com.gui.taskflow.repository;

import com.gui.taskflow.entity.StatusTarefa;
import com.gui.taskflow.entity.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    List<Tarefa> findByStatus(StatusTarefa status);
}