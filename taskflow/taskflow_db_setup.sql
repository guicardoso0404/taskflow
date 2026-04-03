CREATE DATABASE IF NOT EXISTS taskflow_db;
USE taskflow_db;

DROP TABLE IF EXISTS tarefas;

CREATE TABLE tarefas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    status VARCHAR(30) NOT NULL,
    prioridade VARCHAR(20) NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO tarefas (titulo, descricao, status, prioridade)
VALUES
('Primeira tarefa', 'Teste inicial do sistema TaskFlow.', 'PENDENTE', 'MEDIA');
